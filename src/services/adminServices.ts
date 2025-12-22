import axiosInstance from "@/services/axiosInstance";
import { API_PATHS } from "@/services/apiPath";

export const adminService = {
  /* ================= LOGS ================= */
  getLogs: (filters?: { page?: number; limit?: number }) =>
    axiosInstance.get(API_PATHS.ADMIN.LOGS, {
      params: {
        page: filters?.page ?? 1,
        limit: filters?.limit ?? 20,
      },
    }),

  getStats: () => axiosInstance.get(API_PATHS.ADMIN.LOG_STATS),

  /* ================= STUDENTS ================= */
  getStudents: (params?: { page?: number; search?: string }) =>
    axiosInstance.get(API_PATHS.STUDENTS.LIST, { params }),

  updateStudent: (
    id: string,
    payload: {
      isVisible: boolean;
    }
  ) =>
    axiosInstance.patch(API_PATHS.STUDENTS.UPDATE(id), payload),

  deleteStudent: (id: string) =>
    axiosInstance.delete(API_PATHS.STUDENTS.DELETE(id)),

  /* ================= COMPANIES ================= */
  getCompanies: (params?: { page?: number; search?: string }) =>
    axiosInstance.get(API_PATHS.COMPANIES.LIST, { params }),

  updateCompany: (
    id: string,
    payload: {
      isVisible: boolean;
    }
  ) =>
    axiosInstance.patch(API_PATHS.COMPANIES.UPDATE(id), payload),

  deleteCompany: (id: string) =>
    axiosInstance.delete(API_PATHS.COMPANIES.DELETE(id)),
};
