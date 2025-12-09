import { create } from "zustand";
import axios from "@/services/axiosInstance";

export interface CompanyProfile {
  id: string;
  name: string | null;
  logo: string | null;
  website: string | null;
  status: string | null;

  contactInfo: {
    name: string | null;
    phone: string | null;
    email: string | null;
  };

  contactVisibility: {
    phoneNumber: boolean;
    email: boolean;
  };

  summary: string | null;
  sectors: string[];
  preferredSkills: string[];
  interestedRoles: string[];
}

interface CompanyProfileState {
  profile: CompanyProfile | null;
  loading: boolean;
  error: string | null;

  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<CompanyProfile>) => Promise<void>;
  uploadLogo: (file: File) => Promise<void>;
}

/** MAP API → FE */
function mapApiToCompany(raw: any): CompanyProfile {
  return {
    id: raw.id,
    name: raw.companyName ?? raw.name ?? null,
    logo: raw.logo ?? raw.companyLogo ?? null,
    website: raw.websiteUrl ?? raw.website ?? null,
    status: raw.status ?? raw.approvalStatus ?? null,

    contactInfo: {
      name: raw.contactPersonName ?? raw.contact_name ?? null,
      phone: raw.contactPhone ?? raw.contact_phone ?? raw.phone ?? null,
      email: raw.contactEmail ?? raw.email_address ?? raw.email ?? null,
    },

    contactVisibility: {
      phoneNumber: raw.show_phone ?? true,
      email: raw.show_email ?? true,
    },

    summary: raw.summary ?? raw.description ?? null,

    sectors: raw.sectors ?? [],
    preferredSkills: raw.preferredSkills ?? [],
    interestedRoles: raw.interestedRoles ?? [],
  };
}

/** MAP FE → PAYLOAD PATCH */
function mapCompanyToPayload(data: Partial<CompanyProfile>) {
  const out: any = {};

  if (data.name !== undefined) out.companyName = data.name;
  if (data.website !== undefined) out.websiteUrl = data.website;
  if (data.summary !== undefined) out.summary = data.summary;

  if (data.contactInfo) {
    if (data.contactInfo.name !== undefined)
      out.contactPersonName = data.contactInfo.name;
    if (data.contactInfo.phone !== undefined)
      out.contactPhone = data.contactInfo.phone;
    if (data.contactInfo.email !== undefined)
      out.contactEmail = data.contactInfo.email;
  }

  if (data.contactVisibility) {
    if (data.contactVisibility.phoneNumber !== undefined)
      out.show_phone = data.contactVisibility.phoneNumber;
    if (data.contactVisibility.email !== undefined)
      out.show_email = data.contactVisibility.email;
  }

  if (data.sectors !== undefined) out.sectors = data.sectors;
  if (data.preferredSkills !== undefined)
    out.preferredSkills = data.preferredSkills;
  if (data.interestedRoles !== undefined)
    out.interestedRoles = data.interestedRoles;

  return out;
}

export const useCompanyProfileStore = create<CompanyProfileState>((set, get) => ({
  profile: null,
  loading: false,
  error: null,

  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get("/auth/me/profile");
      const mapped = mapApiToCompany(res.data.data);
      set({ profile: mapped });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to fetch profile",
      });
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (data) => {
    try {
      set({ loading: true, error: null });

      const payload = mapCompanyToPayload(data);

      const res = await axios.patch("/auth/me/profile", payload);
      const mapped = mapApiToCompany(res.data.data);

      set({ profile: mapped });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to update profile",
      });
    } finally {
      set({ loading: false });
    }
  },

  uploadLogo: async (file: File) => {
    try {
      set({ loading: true, error: null });

      const form = new FormData();
      form.append("logo", file);

      await axios.post("/auth/me/logo", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await get().fetchProfile();
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to upload logo",
      });
    } finally {
      set({ loading: false });
    }
  },
}));
