// src/services/studentServices.ts
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
  fullName: string;
  status: string;
  employmentStatus: string;
  university: string;
  major: string;
  preferredIndustry: string;
  techStack: string;
  selfIntroduction?: string;
  [key: string]: any;
}

function transformToBackend(data: StudentPayload) {
  return {
    fullName: data.fullName,
    status: data.status,
    employmentStatus: data.employmentStatus,
    university: data.university,
    major: data.major,
    preferredIndustry: data.preferredIndustry,
    techStack: data.techStack,
    selfIntroduction: data.selfIntroduction,
  };
}

// ==============================
// STUDENT SERVICES
// ==============================
export const studentServices = {
  // LIST + FILTER + PAGINATION
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

  // SEARCH
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

  // DETAIL
  getStudentById: (id: string | number) =>
    axiosInstance.get(API_PATHS.STUDENTS.DETAIL(id)),

  // CREATE
  createStudent: (data: StudentPayload) => {
    const payload = transformToBackend(data);
    return axiosInstance.post(API_PATHS.STUDENTS.CREATE, payload);
  },

  // UPDATE
  updateStudent: (id: string | number, data: StudentPayload) => {
    const payload = transformToBackend(data);
    return axiosInstance.patch(API_PATHS.STUDENTS.UPDATE(id), payload);
  },

  // DELETE
  deleteStudent: (id: string | number) =>
    axiosInstance.delete(API_PATHS.STUDENTS.DELETE(id)),

  // STATS
  getStats: () => axiosInstance.get(API_PATHS.STUDENTS.STATS),

  // LOOKUPS
  getUniversities: () => axiosInstance.get(API_PATHS.STUDENTS.UNIVERSITIES),
  getMajors: () => axiosInstance.get(API_PATHS.STUDENTS.MAJORS),
  getPreferredIndustries: () =>
    axiosInstance.get(API_PATHS.STUDENTS.INDUSTRIES),
  getSkills: () => axiosInstance.get(API_PATHS.STUDENTS.SKILLS),

  // FILE UPLOAD
  uploadCV: (id: string | number, data: FormData) =>
    axiosInstance.post(API_PATHS.STUDENTS.UPLOAD_CV(id), data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  uploadPhoto: (id: string | number, data: FormData) =>
    axiosInstance.post(API_PATHS.STUDENTS.UPLOAD_PHOTO(id), data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // FILE DELETE
  deleteCV: (id: string | number) =>
    axiosInstance.delete(API_PATHS.STUDENTS.DELETE_CV(id)),

  deletePhoto: (id: string | number) =>
    axiosInstance.delete(API_PATHS.STUDENTS.DELETE_PHOTO(id)),

  // FILE GET
  getCV: (id: string | number) =>
    axiosInstance.get(API_PATHS.STUDENTS.GET_CV(id)),

  getPhoto: (id: string | number) =>
    axiosInstance.get(API_PATHS.STUDENTS.GET_PHOTO(id)),
};
