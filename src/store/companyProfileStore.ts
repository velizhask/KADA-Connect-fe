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

  contactInfoVisible: boolean;

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

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

/* ===============================
   MAP API → FE (SINGLE SOURCE)
================================ */
function mapApiToCompany(raw: any): CompanyProfile {
  const parseToArray = (v: any): string[] =>
    typeof v === "string"
      ? v.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

  return {
    id: raw.id,
    name: raw.companyName ?? null,
    logo: raw.logo ?? raw.companyLogo ?? null,
    website: raw.website ?? raw.companyWebsite ?? null,
    status: raw.status ?? null,
    linkedin: raw.linkedin ?? null,

    contactInfo: {
      name: raw.contactPersonName ?? null,
      phone: raw.contactPhoneNumber ?? null,
      email: raw.contactEmailAddress ?? null,
    },

    contactInfoVisible: raw.contactInfoVisible ?? false,

    summary: raw.companySummary ?? null,
    sectors: parseToArray(raw.industry),
    preferredSkills: parseToArray(raw.preferredSkillsets),
    interestedRoles: parseToArray(raw.techRoles),

    completionRate: raw.completionRate ?? 0,
  };
}

/* ===============================
   MAP FE → PATCH PAYLOAD
================================ */
function mapCompanyToPayload(data: Partial<CompanyProfile>) {
  const out: any = {};

  if (data.name !== undefined) out.companyName = data.name;
  if (data.website !== undefined) out.companyWebsite = data.website;
  if (data.summary !== undefined) out.companySummary = data.summary;
  if (data.linkedin !== undefined) out.linkedin = data.linkedin;

  if (data.contactInfo) {
    if (data.contactInfo.name !== undefined)
      out.contactPersonName = data.contactInfo.name;
    if (data.contactInfo.phone !== undefined)
      out.contactPhoneNumber = data.contactInfo.phone;
    if (data.contactInfo.email !== undefined)
      out.contactEmailAddress = data.contactInfo.email;
  }

  if (data.contactInfoVisible !== undefined) {
    out.contactInfoVisible = data.contactInfoVisible;
  }

  if (data.sectors !== undefined)
    out.industry = data.sectors.join(", ");

  if (data.preferredSkills !== undefined)
    out.preferredSkillsets = data.preferredSkills.join(", ");

  if (data.interestedRoles !== undefined)
    out.techRoles = data.interestedRoles.join(", ");

  return out;
}

/* ===============================
   STORE
================================ */
export const useCompanyProfileStore = create<CompanyProfileState>()(
  (set, get) => ({
    profile: null,
    loading: false,
    error: null,

    fetchProfile: async () => {
      try {
        set({ loading: true, error: null });
        const res = await axios.get<ApiResponse<any>>("/auth/me/profile");
        set({ profile: mapApiToCompany(res.data.data) });
      } catch (err: any) {
        set({ error: err?.response?.data?.message || "Fetch failed" });
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
        set({ profile: mapApiToCompany(res.data.data) });
      } catch (err: any) {
        set({ error: err?.response?.data?.message || "Update failed" });
      } finally {
        set({ loading: false });
      }
    },

    uploadLogo: async (file) => {
      try {
        set({ loading: true, error: null });
        const form = new FormData();
        form.append("logo", file);
        await axios.post("/auth/me/logo", form);
        await get().fetchProfile();
      } catch (err: any) {
        set({ error: err?.response?.data?.message || "Upload failed" });
      } finally {
        set({ loading: false });
      }
    },
  })
);
