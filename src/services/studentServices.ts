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
  status?: string;
  employmentStatus?: string;
  university?: string;
  major?: string;
  preferredIndustry?: string;
  techStack?: string;
  selfIntroduction?: string;
  phone?: string;
  batch?: string;
  isVisible?: boolean;
  [key: string]: any;
}

// ==============================
// HELPER
// ==============================
function transformToBackend(data: StudentPayload) {
  const payload: Record<string, any> = {};

  if (data.fullName !== undefined) payload.fullName = data.fullName;
  if (data.status !== undefined) payload.status = data.status;
  if (data.employmentStatus !== undefined)
    payload.employmentStatus = data.employmentStatus;
  if (data.university !== undefined) payload.university = data.university;
  if (data.major !== undefined) payload.major = data.major;
  if (data.preferredIndustry !== undefined)
    payload.preferredIndustry = data.preferredIndustry;
  if (data.techStack !== undefined) payload.techStack = data.techStack;
  if (data.selfIntroduction !== undefined)
    payload.selfIntroduction = data.selfIntroduction;
  if (data.phone !== undefined) payload.phone = data.phone;
  if (data.batch !== undefined) payload.batch = data.batch;
  if (data.isVisible !== undefined) payload.isVisible = data.isVisible;

  return payload;
}

// ==============================
// STUDENT SERVICES
// ==============================
export const studentServices = {
  // LIST
  getStudents: (filters?: StudentFilters) =>
    axiosInstance.get(API_PATHS.STUDENTS.LIST, {
      params: {
        page: filters?.page ?? 1,
        limit: filters?.limit ?? 20,
        ...(filters?.status && { status: filters.status }),
        ...(filters?.university && { university: filters.university }),
        ...(filters?.major && { major: filters.major }),
        ...(filters?.industry && { industry: filters.industry }),
        ...(filters?.skills && {
          skills: filters.skills.join(","),
        }),
      },
    }),

  // SEARCH
  searchStudents: (query: string, filters?: StudentFilters) =>
    axiosInstance.get(API_PATHS.STUDENTS.SEARCH, {
      params: {
        q: query.trim(),
        page: filters?.page ?? 1,
        limit: filters?.limit ?? 20,
        ...(filters?.status && { status: filters.status }),
        ...(filters?.university && { university: filters.university }),
        ...(filters?.major && { major: filters.major }),
        ...(filters?.industry && { industry: filters.industry }),
        ...(filters?.skills && {
          skills: filters.skills.join(","),
        }),
      },
    }),

  // DETAIL (UUID STRING ONLY)
  getStudentById: (id: string) =>
    axiosInstance.get(API_PATHS.STUDENTS.DETAIL(id)),

  // CREATE
  createStudent: (data: StudentPayload) =>
    axiosInstance.post(
      API_PATHS.STUDENTS.CREATE,
      transformToBackend(data)
    ),

  // UPDATE (PATCH)
  updateStudent: (id: string, data: StudentPayload) =>
    axiosInstance.patch(
      API_PATHS.STUDENTS.UPDATE(id),
      transformToBackend(data)
    ),

  // DELETE
  deleteStudent: (id: string) =>
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
  uploadCV: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("cv", file);

    return axiosInstance.post(
      API_PATHS.STUDENTS.UPLOAD_CV(id),
      formData
    );
  },

  uploadPhoto: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("photo", file);

    return axiosInstance.post(
      API_PATHS.STUDENTS.UPLOAD_PHOTO(id),
      formData
    );
  },

  // FILE DELETE
  deleteCV: (id: string) =>
    axiosInstance.delete(API_PATHS.STUDENTS.DELETE_CV(id)),

  deletePhoto: (id: string) =>
    axiosInstance.delete(API_PATHS.STUDENTS.DELETE_PHOTO(id)),

  // FILE GET
  getCV: (id: string) =>
    axiosInstance.get(API_PATHS.STUDENTS.GET_CV(id)),

  getPhoto: (id: string) =>
    axiosInstance.get(API_PATHS.STUDENTS.GET_PHOTO(id)),
};
