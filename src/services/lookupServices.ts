import axiosInstance from "@/services/axiosInstance";
import { API_PATHS } from "@/services/apiPath";

// Optional Types (recommended)
export interface TechSkillValidationPayload {
  skills: string[];
}

export const lookupServices = {
  // ================================
  // BASIC LISTS
  // ================================
  getIndustries: () => axiosInstance.get(API_PATHS.LOOKUP.INDUSTRIES),
  getTechRoles: () => axiosInstance.get(API_PATHS.LOOKUP.TECH_ROLES),
  getTechRoleCategories: () =>
    axiosInstance.get(API_PATHS.LOOKUP.TECH_ROLE_CATEGORIES),
  getUniversities: () => axiosInstance.get(API_PATHS.LOOKUP.UNIVERSITIES),
  getMajors: () => axiosInstance.get(API_PATHS.LOOKUP.MAJORS),
  getPreferredIndustries: () =>
    axiosInstance.get(API_PATHS.LOOKUP.PREFERRED_INDUSTRIES),

  // ================================
  // BY CATEGORY
  // ================================
  getTechRolesByCategory: (category: string) =>
    axiosInstance.get(API_PATHS.LOOKUP.TECH_ROLES_BY_CATEGORY(category)),

  // ================================
  // SEARCH
  // ================================
  searchIndustries: (q: string) =>
    axiosInstance.get(API_PATHS.LOOKUP.SEARCH_INDUSTRIES, {
      params: { q },
    }),

  searchTechRoles: (q: string) =>
    axiosInstance.get(API_PATHS.LOOKUP.SEARCH_TECH_ROLES, {
      params: { q },
    }),

  searchUniversities: (q: string) =>
    axiosInstance.get(API_PATHS.LOOKUP.SEARCH_UNIVERSITIES, {
      params: { q },
    }),

  searchMajors: (q: string) =>
    axiosInstance.get(API_PATHS.LOOKUP.SEARCH_MAJORS, {
      params: { q },
    }),

  searchPreferredIndustries: (q: string) =>
    axiosInstance.get(API_PATHS.LOOKUP.SEARCH_PREFERRED_INDUSTRIES, {
      params: { q },
    }),

  // ================================
  // POPULAR LOOKUPS
  // ================================
  getPopularIndustries: () =>
    axiosInstance.get(API_PATHS.LOOKUP.POPULAR_INDUSTRIES),
  getPopularTechRoles: () =>
    axiosInstance.get(API_PATHS.LOOKUP.POPULAR_TECH_ROLES),
  getPopularTechSkills: () =>
    axiosInstance.get(API_PATHS.LOOKUP.POPULAR_TECH_SKILLS),
  getPopularUniversities: () =>
    axiosInstance.get(API_PATHS.LOOKUP.POPULAR_UNIVERSITIES),
  getPopularMajors: () => axiosInstance.get(API_PATHS.LOOKUP.POPULAR_MAJORS),
  getPopularPreferredIndustries: () =>
    axiosInstance.get(API_PATHS.LOOKUP.POPULAR_PREFERRED_INDUSTRIES),

  // ================================
  // TECH SKILLS SUGGEST + VALIDATE
  // ================================
  getTechSkillSuggestions: () =>
    axiosInstance.get(API_PATHS.LOOKUP.TECH_SKILL_SUGGESTIONS),

  validateTechSkills: (skills: string[]) =>
    axiosInstance.post(API_PATHS.LOOKUP.VALIDATE_TECH_SKILLS, {
      skills,
    } satisfies TechSkillValidationPayload),

  // ================================
  // ALL LOOKUP
  // ================================
  getAllLookup: () => axiosInstance.get(API_PATHS.LOOKUP.ALL_LOOKUP),

  // ================================
  // CACHE (ADMIN ONLY)
  // ================================
  clearCache: () => axiosInstance.post(API_PATHS.LOOKUP.CACHE_CLEAR),
  getCacheStatus: () => axiosInstance.get(API_PATHS.LOOKUP.CACHE_STATUS),
};
