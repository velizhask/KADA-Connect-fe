// src/services/authService.ts
import axiosInstance from "@/services/axiosInstance";
import { API_PATHS } from "@/services/apiPath";

class AuthService {
  /** REGISTER TRAINEE */
  async registerTrainee(fullName: string, email: string, password: string) {
    const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      fullName,
      email,
      password,
      role: "student",
    });
    return res.data.data;
  }

  /** REGISTER COMPANY */
  async registerCompany(fullName: string, email: string, password: string) {
    const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      fullName,
      email,
      password,
      role: "company",
    });
    return res.data.data;
  }

  /** LOGIN — Role tetap pakai metadata Supabase */
  async login(email: string, password: string) {
    const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });

    const data = res.data.data;
    const user = data.user;

    // ========================================
    // ROLE FINAL: UTAMAKAN user_metadata.role
    // ========================================
    const role =
      user?.user_metadata?.role ||
      user?.identities?.[0]?.identity_data?.role ||
      null;

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      user,
      role, // ROLE DARI METADATA
      profile: data.profile,
    };
  }
  /** GET FULL PROFILE */
  async getMyProfile() {
    const res = await axiosInstance.get(API_PATHS.AUTH_ME.PROFILE);
    return res.data.data;
  }

  /** UPDATE PROFILE */
  async updateProfile(payload: any) {
    const res = await axiosInstance.patch(API_PATHS.AUTH_ME.UPDATE_PROFILE, payload);
    return res.data.data;
  }

  /** UPLOAD FILES */
  async uploadCV(file: File) {
    const form = new FormData();
    form.append("cv", file);
    const res = await axiosInstance.post(API_PATHS.AUTH_ME.UPLOAD_CV, form);
    return res.data.data;
  }

  async uploadPhoto(file: File) {
    const form = new FormData();
    form.append("photo", file);
    const res = await axiosInstance.post(API_PATHS.AUTH_ME.UPLOAD_PHOTO, form);
    return res.data.data;
  }

  async uploadLogo(file: File) {
    const form = new FormData();
    form.append("logo", file);
    const res = await axiosInstance.post(API_PATHS.AUTH_ME.UPLOAD_LOGO, form);
    return res.data.data;
  }

  /** LOGOUT */
  async logout() {
    await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
    return true;
  }
}

export const authService = new AuthService();
