import axiosInstance from "@/services/axiosInstance";
import { API_PATHS } from "@/services/apiPath";
import { useAuthStore } from "@/store/authStore";

export interface StudentProfileUpdate {
  fullName?: string;
  phone?: string;
  university?: string;
  major?: string;
  batch?: string;
  status?: string;
  employmentStatus?: string;
  preferredIndustry?: string;
  techStack?: string;
  selfIntroduction?: string;
  cv_url?: string;
  profilePhoto?: string;
}

export interface CompanyProfileUpdate {
  companyName?: string;
  companySummary?: string;
  industry?: string[];
  techRoles?: string[];
  preferredSkillsets?: string[];
  companyWebsite?: string;
  linkedin?: string;
  contactPersonName?: string;
  contactEmailAddress?: string;
  contactPhoneNumber?: string;
  contactInfoVisible?: boolean;
  logo_url?: string;
}

export type ProfileUpdatePayload =
  | StudentProfileUpdate
  | CompanyProfileUpdate
  | Record<string, any>;

export const authMeService = {
  // GET PROFILE
  getProfile: () => axiosInstance.get(API_PATHS.AUTH_ME.PROFILE),

  // UPDATE PROFILE — auto detect role
  updateProfile: (payload: ProfileUpdatePayload) => {
    const { role } = useAuthStore.getState();

    let sanitized: Record<string, any> = {};

    if (role === "student") {
      const allowed = [
        "fullName",
        "phone",
        "university",
        "major",
        "batch",
        "status",
        "employmentStatus",
        "preferredIndustry",
        "techStack",
        "selfIntroduction",
        "linkedin",
        "portfolioLink",
        "cv_url",
        "profilePhoto",
      ];
      sanitized = Object.fromEntries(
        Object.entries(payload).filter(([key]) => allowed.includes(key))
      );
    }

    if (role === "company") {
      const allowed = [
        "companyName",
        "companySummary",
        "industry",
        "techRoles",
        "preferredSkillsets",
        "companyWebsite",
        "linkedin",
        "contactPersonName",
        "contactEmailAddress",
        "contactPhoneNumber",
        "contactInfoVisible",
        "logo_url",
      ];
      sanitized = Object.fromEntries(
        Object.entries(payload).filter(([key]) => allowed.includes(key))
      );
    }

    return axiosInstance.patch(API_PATHS.AUTH_ME.UPDATE_PROFILE, sanitized);
  },

  // UPLOADS
  uploadCV: (formData: FormData) =>
    axiosInstance.post(API_PATHS.AUTH_ME.UPLOAD_CV, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  uploadPhoto: (formData: FormData) =>
    axiosInstance.post(API_PATHS.AUTH_ME.UPLOAD_PHOTO, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  uploadLogo: (formData: FormData) =>
    axiosInstance.post(API_PATHS.AUTH_ME.UPLOAD_LOGO, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
