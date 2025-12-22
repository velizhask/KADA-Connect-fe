import { create } from "zustand";
import axiosInstance from "@/services/axiosInstance";
import { API_PATHS } from "@/services/apiPath";

export interface CompanyProfile {
  id: string;

  companyName: string;
  companySummary: string | null;

  industry: string | null;              
  techRoles: string | null;           
  preferredSkillsets: string | null;   

  website: string | null;
  logo: string | null;

  contactPerson: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  contactInfoVisible: boolean;

  completionRate: number | null;
}

interface CompanyProfileState {
  profile: CompanyProfile | null;
  loading: boolean;
  error: string | null;

  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<CompanyProfile>) => Promise<void>;
  uploadLogo: (file: File) => Promise<void>;
}

function mapApiToCompanyProfile(raw: any): CompanyProfile {
  return {
    id: raw.id,

    companyName: raw.companyName ?? null,
    companySummary: raw.companySummary ?? null,

    industry: raw.industry ?? null,
    techRoles: raw.techRoles ?? null,
    preferredSkillsets: raw.preferredSkillsets ?? null,

    website: raw.website ?? null,
    logo: raw.logo ?? null,

    contactPerson: raw.contactPerson ?? null,
    contactEmail: raw.contactEmail ?? null,
    contactPhone: raw.contactPhone ?? null,
    contactInfoVisible: raw.contactInfoVisible ?? false,

    completionRate: raw.completionRate ?? null,
  };
}

function mapCompanyUpdateToPayload(
  data: Partial<CompanyProfile>
): any {
  const payload: any = {};

  if (data.companyName !== undefined)
    payload.companyName = data.companyName;

  if (data.companySummary !== undefined)
    payload.companySummary = data.companySummary;

  if (data.industry !== undefined)
    payload.industry = data.industry;

  if (data.techRoles !== undefined)
    payload.techRoles = data.techRoles;

  if (data.preferredSkillsets !== undefined)
    payload.preferredSkillsets = data.preferredSkillsets;

  if (data.website !== undefined)
    payload.website = data.website;

  if (data.contactPerson !== undefined)
    payload.contactPerson = data.contactPerson;

  if (data.contactEmail !== undefined)
    payload.contactEmail = data.contactEmail;

  if (data.contactPhone !== undefined)
    payload.contactPhone = data.contactPhone;

  if (data.contactInfoVisible !== undefined)
    payload.contactInfoVisible = data.contactInfoVisible;

  return payload;
}


export const useCompanyProfileStore = create<CompanyProfileState>(
  (set, get) => ({
    profile: null,
    loading: false,
    error: null,

    // Fetch company profile (auth user)
    fetchProfile: async () => {
      try {
        set({ loading: true, error: null });

        const res = await axiosInstance.get(
          API_PATHS.AUTH_ME.PROFILE
        );

        set({ profile: mapApiToCompanyProfile(res.data.data) });
      } catch (err: any) {
        set({
          error:
            err?.response?.data?.message ||
            "Failed to fetch company profile",
        });
      } finally {
        set({ loading: false });
      }
    },

    // Update company profile
    updateProfile: async (data) => {
      try {
        set({ loading: true, error: null });

        const payload = mapCompanyUpdateToPayload(data);

        const res = await axiosInstance.patch(
          API_PATHS.AUTH_ME.UPDATE_PROFILE,
          payload
        );

        set({ profile: mapApiToCompanyProfile(res.data.data) });
      } catch (err: any) {
        set({
          error:
            err?.response?.data?.message ||
            "Failed to update company profile",
        });
      } finally {
        set({ loading: false });
      }
    },

    // Upload company logo
    uploadLogo: async (file: File) => {
      try {
        const form = new FormData();
        form.append("file", file);

        await axiosInstance.post(
          API_PATHS.AUTH_ME.UPLOAD_LOGO,
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        await get().fetchProfile();
      } catch (err: any) {
        set({
          error:
            err?.response?.data?.message ||
            "Failed to upload company logo",
        });
      }
    },
  })
);
