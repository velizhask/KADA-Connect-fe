import axiosInstance from "@/services/axiosInstance";
import { API_PATHS } from "@/services/apiPath";

export interface ProfileUpdatePayload {
  name?: string;
  email?: string;
  photo_url?: string;
  cv_url?: string;
  industries?: string[];
  tech_roles?: string[];
  tech_skills?: string[];
  website?: string;
  company_name?: string;
  [key: string]: any;
}

export const authMeService = {
  // Get current user profile (student/company)
  getProfile: () => axiosInstance.get(API_PATHS.AUTH_ME.PROFILE),

  // Update profile (auto validates based on role)
  updateProfile: (data: ProfileUpdatePayload) =>
    axiosInstance.patch(API_PATHS.AUTH_ME.UPDATE_PROFILE, data),

  // Upload student CV
  uploadCV: (formData: FormData) =>
    axiosInstance.post(API_PATHS.AUTH_ME.UPLOAD_CV, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Upload student photo
  uploadPhoto: (formData: FormData) =>
    axiosInstance.post(API_PATHS.AUTH_ME.UPLOAD_PHOTO, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Upload company logo
  uploadLogo: (formData: FormData) =>
    axiosInstance.post(API_PATHS.AUTH_ME.UPLOAD_LOGO, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
