import axiosInstance from "@/services/axiosInstance";
import { API_PATHS } from "@/services/apiPath";

// ==============================
// TYPES
// ==============================

export interface CompanyFilters {
  page?: number;
  limit?: number;
  industry?: string;
  techRole?: string;
  [key: string]: any;
}

export interface CompanyPayload {
  companyName?: string;
  companySummary?: string;
  industry?: string | string[];
  website?: string;
  techRoles?: string | string[];
  preferredSkillsets?: string | string[];

  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactInfoVisible?: boolean;

  isVisible?: boolean;
  [key: string]: any;
}

// ==============================
// HELPER
// ==============================

const normalizeArray = (v?: string | string[]) =>
  Array.isArray(v) ? v.join(", ") : v;

// ONLY send fields that exist
function transformToBackend(data: CompanyPayload) {
  const payload: Record<string, any> = {};

  if (data.companyName !== undefined)
    payload.companyName = data.companyName;

  if (data.companySummary !== undefined)
    payload.companySummary = data.companySummary;

  if (data.industry !== undefined)
    payload.industry = normalizeArray(data.industry);

  if (data.website !== undefined)
    payload.website = data.website;

  if (data.techRoles !== undefined)
    payload.techRoles = normalizeArray(data.techRoles);

  if (data.preferredSkillsets !== undefined)
    payload.preferredSkillsets = normalizeArray(data.preferredSkillsets);

  if (data.contactPerson !== undefined)
    payload.contactPerson = data.contactPerson;

  if (data.contactEmail !== undefined)
    payload.contactEmail = data.contactEmail;

  if (data.contactPhone !== undefined)
    payload.contactPhone = data.contactPhone;

  if (data.contactInfoVisible !== undefined)
    payload.contactInfoVisible = data.contactInfoVisible;

  if (data.isVisible !== undefined)
    payload.isVisible = data.isVisible;

  return payload;
}

// ==============================
// COMPANY SERVICE
// ==============================

export const companyServices = {
  // ======================================
  // GET ALL COMPANIES
  // ======================================
  getCompanies: (filters?: CompanyFilters) =>
    axiosInstance.get(API_PATHS.COMPANIES.LIST, { params: filters }),

  // ======================================
  // GET COMPANY BY ID (UUID)
  // ======================================
  getCompanyById: (id: string) =>
    axiosInstance.get(API_PATHS.COMPANIES.DETAIL(id)),

  // ======================================
  // CREATE COMPANY PROFILE
  // ======================================
  createCompanyProfile: (data: CompanyPayload) => {
    return axiosInstance.post(
      API_PATHS.COMPANIES.CREATE,
      transformToBackend(data)
    );
  },

  // ======================================
  // UPDATE COMPANY PROFILE (PATCH)
  // ======================================
  updateCompanyProfile: (id: string, data: CompanyPayload) => {
    return axiosInstance.patch(
      API_PATHS.COMPANIES.UPDATE(id),
      transformToBackend(data)
    );
  },

  // ======================================
  // DELETE COMPANY
  // ======================================
  deleteCompany: (id: string) =>
    axiosInstance.delete(API_PATHS.COMPANIES.DELETE(id)),

  // ======================================
  // SEARCH COMPANIES
  // ======================================
  searchCompanies: (query: string, filters?: CompanyFilters) =>
    axiosInstance.get(API_PATHS.COMPANIES.SEARCH, {
      params: {
        q: query.trim(),
        ...(filters?.industry && { industry: filters.industry }),
        ...(filters?.techRole && { techRole: filters.techRole }),
        page: filters?.page ?? 1,
        limit: filters?.limit ?? 20,
      },
    }),

  // ======================================
  // LOOKUPS
  // ======================================
  getIndustries: () =>
    axiosInstance.get(API_PATHS.COMPANIES.INDUSTRIES),

  getTechRoles: () =>
    axiosInstance.get(API_PATHS.COMPANIES.TECH_ROLES),

  // ======================================
  // STATS
  // ======================================
  getStats: () =>
    axiosInstance.get(API_PATHS.COMPANIES.STATS),

  // ======================================
  // LOGO UPLOAD (multipart/form-data)
  // /companies/:id/logo
  // ======================================
  uploadLogo: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("logo", file);

    return axiosInstance.post(
      API_PATHS.COMPANIES.UPLOAD_LOGO(id),
      formData
    );
  },

  // ======================================
  // DELETE LOGO
  // ======================================
  deleteLogo: (id: string) =>
    axiosInstance.delete(API_PATHS.COMPANIES.DELETE_LOGO(id)),

  // ======================================
  // GET LOGO
  // ======================================
  getLogo: (id: string) =>
    axiosInstance.get(API_PATHS.COMPANIES.GET_LOGO(id)),
};
