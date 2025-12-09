import { create } from "zustand";
import axios from "@/services/axiosInstance";

export interface CompanyProfile {
  id: string;
  name: string | null;
  logo: string | null;
  website: string | null;
  status: string | null;
  linkedin: string | null;

  contactInfo: {
    name: string | null;
    phone: string | null;
    email: string | null;
  };

  contactVisibility: {
    phoneNumber: boolean;
    email: boolean;
    enabled: boolean;
  };

  summary: string | null;
  sectors: string[];
  preferredSkills: string[];
  interestedRoles: string[];
  completionRate: number;
}

interface CompanyProfileState {
  profile: CompanyProfile | null;
  loading: boolean;
  error: string | null;

  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<CompanyProfile>) => Promise<void>;
  uploadLogo: (file: File) => Promise<void>;
}

// ===================================================
// Helper: API response type
// ===================================================
type ApiResponse<T> = {
  success: boolean;
  data: T;
};

/** MAP API → FE */
function mapApiToCompany(raw: any): CompanyProfile {
  const parseToArray = (value: any): string[] => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.trim()) {
      return value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [];
  };

  return {
    id: raw.id,
    name: raw.companyName ?? raw.name ?? null,
    logo: raw.logo ?? raw.companyLogo ?? null,
    website: raw.website ?? raw.websiteUrl ?? null,
    status: raw.status ?? raw.approvalStatus ?? null,
    linkedin: raw.linkedin ?? raw.linkedinUrl ?? null,

    contactInfo: {
      name: raw.contactPerson ?? raw.contactPersonName ?? raw.contact_name ?? null,
      phone: raw.contactPhone ?? raw.contact_phone ?? raw.phone ?? null,
      email: raw.contactEmail ?? raw.email_address ?? raw.email ?? null,
    },

    contactVisibility: {
      phoneNumber: raw.show_phone ?? raw.contactInfoVisible ?? true,
      email: raw.show_email ?? raw.contactInfoVisible ?? true,
      enabled: raw.contactInfoVisible ?? true,
    },

    summary: raw.companySummary ?? raw.summary ?? raw.description ?? null,

    sectors: parseToArray(raw.sectors ?? raw.industry),
    preferredSkills: parseToArray(raw.preferredSkills ?? raw.preferredSkillsets),
    interestedRoles: parseToArray(raw.interestedRoles ?? raw.techRoles),

    completionRate: raw.completionRate ?? 0,
  };
}

/** MAP FE → PAYLOAD PATCH */
function mapCompanyToPayload(data: Partial<CompanyProfile>) {
  const out: any = {};

  if (data.name !== undefined) out.companyName = data.name;
  if (data.website !== undefined) out.website = data.website;
  if (data.summary !== undefined) out.companySummary = data.summary;
  if (data.linkedin !== undefined) out.linkedin = data.linkedin;

  if (data.contactInfo) {
    if (data.contactInfo.name !== undefined)
      out.contactPerson = data.contactInfo.name;
    if (data.contactInfo.phone !== undefined)
      out.contactPhone = data.contactInfo.phone;
    if (data.contactInfo.email !== undefined)
      out.contactEmail = data.contactInfo.email;
  }

  if (data.contactVisibility) {
    if (data.contactVisibility.enabled !== undefined)
      out.contactInfoVisible = data.contactVisibility.enabled;

    if (data.contactVisibility.phoneNumber !== undefined)
      out.show_phone = data.contactVisibility.phoneNumber;
    if (data.contactVisibility.email !== undefined)
      out.show_email = data.contactVisibility.email;
  }

  if (data.sectors !== undefined) {
    out.sectors = Array.isArray(data.sectors)
      ? data.sectors.join(", ")
      : data.sectors;
  }

  if (data.preferredSkills !== undefined) {
    out.preferredSkillsets = Array.isArray(data.preferredSkills)
      ? data.preferredSkills.join(", ")
      : data.preferredSkills;
  }

  if (data.interestedRoles !== undefined) {
    out.techRoles = Array.isArray(data.interestedRoles)
      ? data.interestedRoles.join(", ")
      : data.interestedRoles;
  }

  return out;
}

// ===================================================
// ZUSTAND STORE — pakai v5 style: create<>()((set) => {})
// ===================================================
export const useCompanyProfileStore = create<CompanyProfileState>()(
  (set, get) => ({
    profile: null,
    loading: false,
    error: null,

    fetchProfile: async () => {
      try {
        set({ loading: true, error: null });

        const res = await axios.get<ApiResponse<any>>("/auth/me/profile");
        const mapped = mapApiToCompany(res.data.data);

        set({ profile: mapped });
      } catch (err: any) {
        set({
          error:
            err?.response?.data?.message || "Failed to fetch company profile",
        });
      } finally {
        set({ loading: false });
      }
    },

    updateProfile: async (data) => {
      try {
        set({ loading: true, error: null });

        const payload = mapCompanyToPayload(data);
        const res = await axios.patch<ApiResponse<any>>(
          "/auth/me/profile",
          payload
        );

        const mapped = mapApiToCompany(res.data.data);
        set({ profile: mapped });
      } catch (err: any) {
        set({
          error:
            err?.response?.data?.message || "Failed to update company profile",
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
  })
);
