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
  companyWebsite?: string;
  logo?: string | null;
  techRoles?: string | string[];
  preferredSkillsets?: string | string[];
  contactPersonName?: string;
  contactEmailAddress?: string;
  contactPhoneNumber?: string;
  contactInfoVisible?: boolean;
  isVisible?: boolean;
  [key: string]: any;
}

// ==============================
// HELPER — Convert camelCase → backend format
// ==============================

function transformToBackend(data: CompanyPayload) {
  const transformArray = (v: any) =>
    Array.isArray(v) ? v.join(", ") : v || null;

  const payload: any = {
    companyName: data.companyName,
    companySummary: data.companySummary,
    industry: transformArray(data.industry),
    companyWebsite: data.companyWebsite ?? null,
    techRoles: transformArray(data.techRoles),
    preferredSkillsets: transformArray(data.preferredSkillsets),
    contactPersonName: data.contactPersonName,
    contactEmailAddress: data.contactEmailAddress,
    contactPhoneNumber: data.contactPhoneNumber,
    visibleContactInfo: data.contactInfoVisible,
    emailAddress: data.emailAddress,
    isVisible: data.isVisible ?? true,
  };

  if (data.logo) {
    payload.companyLogo = data.logo;
  }

  return payload;
}


// ==============================
// COMPANY SERVICE
// ==============================
export const companyServices = {
  // ======================================
  // GET ALL COMPANIES (public or authed)
  // ======================================
  getCompanies: (filters?: CompanyFilters) =>
    axiosInstance.get(API_PATHS.COMPANIES.LIST, { params: filters }),

  // ======================================
  // GET COMPANY BY ID
  // ======================================
  getCompanyById: (id: string | number) =>
    axiosInstance.get(API_PATHS.COMPANIES.DETAIL(id)),

  // ======================================
  // CREATE COMPANY PROFILE (STEP 2)
  // Backend uses authenticated user.id as company.id
  // ======================================
  createCompanyProfile: (data: CompanyPayload) => {
    const payload = transformToBackend(data);
    return axiosInstance.post(API_PATHS.COMPANIES.CREATE, payload);
  },

  // ======================================
  // UPDATE COMPANY PROFILE (PATCH)
  // ======================================
  updateCompanyProfile: (id: string | number, data: CompanyPayload) => {
    const payload = transformToBackend(data);
    return axiosInstance.patch(API_PATHS.COMPANIES.UPDATE(id), payload);
  },

  // ======================================
  // DELETE COMPANY
  // ======================================
  deleteCompany: (id: string | number) =>
    axiosInstance.delete(API_PATHS.COMPANIES.DELETE(id)),

  // ======================================
  // SEARCH COMPANIES
  // ======================================
  searchCompanies: (query: string, filters?: CompanyFilters) =>
    axiosInstance.get(API_PATHS.COMPANIES.SEARCH, {
      params: {
        q: query?.trim(),
        ...(filters?.industry && { industry: filters.industry }),
        ...(filters?.techRole && { techRole: filters.techRole }),
        page: filters?.page ?? 1,
        limit: filters?.limit ?? 20,
      },
    }),

  // ======================================
  // INDUSTRIES & TECH ROLES
  // ======================================
  getIndustries: () => axiosInstance.get(API_PATHS.COMPANIES.INDUSTRIES),
  getTechRoles: () => axiosInstance.get(API_PATHS.COMPANIES.TECH_ROLES),

  // ======================================
  // STATS
  // ======================================
  getStats: () => axiosInstance.get(API_PATHS.COMPANIES.STATS),

  // ======================================
  // VALIDATE LOGO (URL or upload)
  // ======================================
  validateLogo: (data: { logoUrl: string }) =>
    axiosInstance.post(API_PATHS.COMPANIES.VALIDATE_LOGO, data),

  // ======================================
  // UPLOAD LOGO — multipart/form-data
  // /companies/:id/logo
  // ======================================
  uploadLogo: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return axiosInstance.post(API_PATHS.COMPANIES.UPLOAD_LOGO(id), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // ======================================
  // DELETE LOGO
  // ======================================
  deleteLogo: (id: string) =>
    axiosInstance.delete(API_PATHS.COMPANIES.DELETE_LOGO(id)),

  // ======================================
  // GET LOGO DETAIL
  // ======================================
  getLogo: (id: string) =>
    axiosInstance.get(API_PATHS.COMPANIES.GET_LOGO(id)),
};
