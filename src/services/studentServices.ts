import axiosInstance from "@/services/axiosInstance";
import { API_PATHS } from "@/services/apiPath";

// ==============================
// TYPES
// ==============================
export interface StudentFilters {
  page?: number;
  limit?: number;
  status?: string;
  university?: string;
  major?: string;
  industry?: string;
  skills?: string[];
  [key: string]: any;
}

export interface StudentPayload {
  fullName?: string;
  university?: string;
  major?: string;
  preferredIndustry?: string | string[];
  techStack?: string | string[];
  selfIntroduction?: string;
  linkedin?: string;
  portfolioLink?: string;
  phoneNumber?: string;
  email?: string;
  batch?: string;
  isVisible?: boolean;
  [key: string]: any;
}

// ==============================
// TRANSFORM camelCase → backend snake_case
// ==============================
function transformToBackend(data: StudentPayload) {
  const toCSV = (v: any) =>
    Array.isArray(v) ? v.join(", ") : v || null;

  return {
    full_name: data.fullName ?? null,
    university_institution: data.university ?? null,
    program_major: data.major ?? null,

    preferred_industry: toCSV(data.preferredIndustry),
    tech_stack_skills: toCSV(data.techStack),

    self_introduction: data.selfIntroduction ?? null,
    linkedin: data.linkedin ?? null,
    portfolio_link: data.portfolioLink ?? null,

    phone_number: data.phoneNumber ?? null,
    email_address: data.email ?? null,

    batch: data.batch ?? null,
    is_visible: data.isVisible ?? true,
  };
}

// ==============================
// STUDENT SERVICES
// ==============================
export const studentServices = {
  // ================================
  // LIST + FILTER + PAGINATION
  // ================================
  getStudents: (filters?: StudentFilters) =>
    axiosInstance.get(API_PATHS.STUDENTS.LIST, {
      params: {
        page: filters?.page ?? 1,
        limit: filters?.limit ?? 20,
        ...(filters?.status && { status: filters.status }),
        ...(filters?.university && { university: filters.university }),
        ...(filters?.major && { major: filters.major }),
        ...(filters?.industry && { industry: filters.industry }),
        ...(filters?.skills && { skills: filters.skills }),
      },
    }),

  // ================================
  // SEARCH
  // ================================
  searchStudents: (query: string, filters?: StudentFilters) =>
    axiosInstance.get(API_PATHS.STUDENTS.SEARCH, {
      params: {
        q: query?.trim(),
        page: filters?.page ?? 1,
        limit: filters?.limit ?? 20,
        ...(filters?.status && { status: filters.status }),
        ...(filters?.university && { university: filters.university }),
        ...(filters?.major && { major: filters.major }),
        ...(filters?.industry && { industry: filters.industry }),
        ...(filters?.skills && { skills: filters.skills }),
      },
    }),

  // ================================
  // DETAIL
  // ================================
  getStudentById: (id: string | number) =>
    axiosInstance.get(API_PATHS.STUDENTS.DETAIL(id)),

  // ================================
  // CREATE
  // ================================
  createStudent: (data: StudentPayload) => {
    const payload = transformToBackend(data);
    return axiosInstance.post(API_PATHS.STUDENTS.CREATE, payload);
  },

  // ================================
  // UPDATE
  // ================================
  updateStudent: (id: string | number, data: StudentPayload) => {
    const payload = transformToBackend(data);
    return axiosInstance.patch(API_PATHS.STUDENTS.UPDATE(id), payload);
  },

  // ================================
  // DELETE
  // ================================
  deleteStudent: (id: string | number) =>
    axiosInstance.delete(API_PATHS.STUDENTS.DELETE(id)),

  // ================================
  // STATS
  // ================================
  getStats: () => axiosInstance.get(API_PATHS.STUDENTS.STATS),

  // ================================
  // LOOKUPS
  // ================================
  getUniversities: () => axiosInstance.get(API_PATHS.STUDENTS.UNIVERSITIES),
  getMajors: () => axiosInstance.get(API_PATHS.STUDENTS.MAJORS),
  getPreferredIndustries: () =>
    axiosInstance.get(API_PATHS.STUDENTS.INDUSTRIES),
  getSkills: () => axiosInstance.get(API_PATHS.STUDENTS.SKILLS),

  // ================================
  // FILE UPLOAD ROUTES
  // ================================
  uploadCV: (id: string | number, data: FormData) =>
    axiosInstance.post(API_PATHS.STUDENTS.UPLOAD_CV(id), data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  uploadPhoto: (id: string | number, data: FormData) =>
    axiosInstance.post(API_PATHS.STUDENTS.UPLOAD_PHOTO(id), data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // ================================
  // FILE DELETE
  // ================================
  deleteCV: (id: string | number) =>
    axiosInstance.delete(API_PATHS.STUDENTS.DELETE_CV(id)),

  deletePhoto: (id: string | number) =>
    axiosInstance.delete(API_PATHS.STUDENTS.DELETE_PHOTO(id)),

  // ================================
  // FILE GET
  // ================================
  getCV: (id: string | number) =>
    axiosInstance.get(API_PATHS.STUDENTS.GET_CV(id)),

  getPhoto: (id: string | number) =>
    axiosInstance.get(API_PATHS.STUDENTS.GET_PHOTO(id)),
};
