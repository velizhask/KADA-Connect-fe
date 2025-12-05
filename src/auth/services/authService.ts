import axiosInstance from "@/services/axiosInstance";
import { API_PATHS } from "@/services/apiPath";

class AuthService {
  // =======================================
  // REGISTER TRAINEE (ROLE: student)
  // =======================================
  async registerTrainee(fullName: string, email: string, password: string) {
    const payload = {
      fullName,
      email,
      password,
      role: "student",
    };

    const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, payload);
    return res.data;
  }

  // =======================================
  // REGISTER COMPANY (ROLE: company)
  // =======================================
  async registerCompany(fullName: string, email: string, password: string) {
    const payload = {
      fullName,
      email,
      password,
      role: "company",
    };

    const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, payload);
    return res.data;
  }

  // =======================================
  // LOGIN (company or trainee)
  // Backend returns: access_token, refresh_token, profile, user
  // =======================================
  async login(email: string, password: string) {
    const payload = { email, password };
    const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, payload);
    return res.data.data;
  }

  // =======================================
  // LOGOUT
  // =======================================
  async logout() {
    const res = await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
    return res.data;
  }
}

export const authService = new AuthService();
