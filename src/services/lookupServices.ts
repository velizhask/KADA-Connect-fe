import axiosInstance from "@/services/axiosInstance";
import { API_PATHS } from "@/services/apiPath";

export const lookupServices = {
  // TECH SKILLS SUGGESTIONS
  getTechSkillSuggestions: () =>
    axiosInstance.get(API_PATHS.LOOKUP.TECH_SKILL_SUGGESTIONS),

  // POPULAR LOOKUPS
  getPopularIndustries: () =>
    axiosInstance.get(API_PATHS.LOOKUP.POPULAR_INDUSTRIES),

  getPopularTechRoles: () =>
    axiosInstance.get(API_PATHS.LOOKUP.POPULAR_TECH_ROLES),

  getPopularTechSkills: () =>
    axiosInstance.get(API_PATHS.LOOKUP.POPULAR_TECH_SKILLS),

  getPopularUniversities: () =>
    axiosInstance.get(API_PATHS.LOOKUP.POPULAR_UNIVERSITIES),

  getPopularMajors: () =>
    axiosInstance.get(API_PATHS.LOOKUP.POPULAR_MAJORS),

  getPopularPreferredIndustries: () =>
    axiosInstance.get(API_PATHS.LOOKUP.POPULAR_PREFERRED_INDUSTRIES),

  // CACHE
  clearCache: () => axiosInstance.post(API_PATHS.LOOKUP.CACHE_CLEAR),

  getCacheStatus: () => axiosInstance.get(API_PATHS.LOOKUP.CACHE_STATUS),
};
