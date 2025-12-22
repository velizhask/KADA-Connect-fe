import axiosInstance from "@/services/axiosInstance";
import { API_PATHS } from "@/services/apiPath";

/* =====================================================
 * GENERIC PAGINATION FETCHER
 * ===================================================== */

async function fetchAllPages<T>(
  fetcher: (params: { page: number; limit: number }) => Promise<any>,
  limit = 100
): Promise<T[]> {
  let page = 1;
  let totalPages = 1;
  let allData: T[] = [];

  do {
    const res = await fetcher({ page, limit });

    const data: T[] = res.data.data ?? [];
    const pagination = res.data.pagination;

    allData = allData.concat(data);
    totalPages = pagination?.totalPages ?? 1;

    page++;
  } while (page <= totalPages);

  return allData;
}

/* =====================================================
 * ADMIN SERVICE
 * ===================================================== */

export const adminService = {
  /* ================= ADMIN LOGS ================= */

  getLogs: (filters?: { page?: number; limit?: number }) =>
    axiosInstance.get(API_PATHS.ADMIN.LOGS, {
      params: {
        page: filters?.page ?? 1,
        limit: filters?.limit ?? 20,
      },
    }),

  getStats: () =>
    axiosInstance.get(API_PATHS.ADMIN.LOG_STATS),

  /* ================= STUDENTS ================= */

  // Fetch 1 page (default behaviour)
  getStudents: (params?: { page?: number; limit?: number; search?: string }) =>
    axiosInstance.get(API_PATHS.STUDENTS.LIST, {
      params: {
        page: params?.page ?? 1,
        limit: params?.limit ?? 20,
        search: params?.search,
      },
    }),

  // Fetch ALL students (loop pagination)
  getAllStudents: async () =>
    fetchAllPages<any>(
      (params) =>
        axiosInstance.get(API_PATHS.STUDENTS.LIST, {
          params,
        }),
      100
    ),

  updateStudent: (
    id: string,
    payload: {
      isVisible: boolean;
    }
  ) =>
    axiosInstance.patch(
      API_PATHS.STUDENTS.UPDATE(id),
      payload
    ),

  deleteStudent: (id: string) =>
    axiosInstance.delete(
      API_PATHS.STUDENTS.DELETE(id)
    ),

  /* ================= COMPANIES ================= */

  // Fetch 1 page (default behaviour)
  getCompanies: (params?: { page?: number; limit?: number; search?: string }) =>
    axiosInstance.get(API_PATHS.COMPANIES.LIST, {
      params: {
        page: params?.page ?? 1,
        limit: params?.limit ?? 20,
        search: params?.search,
      },
    }),

  // Fetch ALL companies (loop pagination)
  getAllCompanies: async () =>
    fetchAllPages<any>(
      (params) =>
        axiosInstance.get(API_PATHS.COMPANIES.LIST, {
          params,
        }),
      100
    ),

  updateCompany: (
    id: string,
    payload: {
      isVisible: boolean;
    }
  ) =>
    axiosInstance.patch(
      API_PATHS.COMPANIES.UPDATE(id),
      payload
    ),

  deleteCompany: (id: string) =>
    axiosInstance.delete(
      API_PATHS.COMPANIES.DELETE(id)
    ),
};
