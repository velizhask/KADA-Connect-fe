import axiosInstance from "@/services/axiosInstance";
import { API_PATHS } from "@/services/apiPath";

export const adminService = {
  // Get all CRUD logs
  getLogs: (filters?: { page?: number; limit?: number }) =>
    axiosInstance.get(API_PATHS.ADMIN.LOGS, {
      params: {
        page: filters?.page ?? 1,
        limit: filters?.limit ?? 20,
      },
    }),
  // Get log statistics
  getStats: () => axiosInstance.get(API_PATHS.ADMIN.LOG_STATS),
};
