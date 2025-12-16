import axiosInstance from "@/services/axiosInstance";
import { API_PATHS } from "@/services/apiPath";

// ==============================
// TYPES
// ==============================

export interface CompanyFilters {
  page?: number;
  limit?: number;
  industry?: string[];  
  techRole?: string[];   
  [key: string]: any;
}

export interface CompanyPayload {
  emailAddress?: string;

  companyName?: string;
  companySummary?: string;
  industry?: string | string[];
  companyWebsite?: string;
  linkedin?: string;

  techRoles?: string | string[];
  preferredSkillsets?: string | string[];

  contactPersonName?: string;
  contactEmailAddress?: string;
  contactPhoneNumber?: string;
  visibleContactInfo?: boolean;

  isVisible?: boolean;
}


// ==============================
// HELPER
// ==============================

const normalizeArray = (v?: string | string[]) =>
  Array.isArray(v) ? v.join(", ") : v;

// ONLY send fields that exist
function transformToBackend(data: CompanyPayload) {
  const payload: Record<string, any> = {};

  if (data.emailAddress !== undefined)
    payload.emailAddress = data.emailAddress;

  if (data.companyName !== undefined)
    payload.companyName = data.companyName;

  if (data.companySummary !== undefined)
    payload.companySummary = data.companySummary;

  if (data.industry !== undefined)
    payload.industry = normalizeArray(data.industry);

  if (data.techRoles !== undefined)
    payload.techRoles = normalizeArray(data.techRoles);

  if (data.preferredSkillsets !== undefined)
    payload.preferredSkillsets = normalizeArray(data.preferredSkillsets);

  if (data.companyWebsite !== undefined)
    payload.companyWebsite = data.companyWebsite;

  if (data.linkedin !== undefined)
    payload.linkedin = data.linkedin;

  if (data.contactPersonName !== undefined)
    payload.contactPersonName = data.contactPersonName;

  if (data.contactEmailAddress !== undefined)
    payload.contactEmailAddress = data.contactEmailAddress;

  if (data.contactPhoneNumber !== undefined)
    payload.contactPhoneNumber = data.contactPhoneNumber;

  if (data.visibleContactInfo !== undefined)
    payload.visibleContactInfo = data.visibleContactInfo;

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
  axiosInstance.get(API_PATHS.COMPANIES.LIST, {
    params: {
      page: filters?.page ?? 1,
      limit: filters?.limit ?? 10,

      ...(filters?.industry?.length && {
        industry: filters.industry.join(","),
      }),

      ...(filters?.techRole?.length && {
        techRole: filters.techRole.join(","), 
      }),
    },
  }),

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
      page: filters?.page ?? 1,
      limit: filters?.limit ?? 10,

      ...(filters?.industry?.length && {
        industry: filters.industry.join(","),
      }),

      ...(filters?.techRole?.length && {
        techRole: filters.techRole.join(","),
      }),
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
