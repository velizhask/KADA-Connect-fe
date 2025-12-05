export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const API_PATHS = {
  // ================================
  // AUTH ROUTES
  // ================================
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    ME: `${API_BASE_URL}/auth/me`,
  },

  // ================================
  // AUTH / ME ROUTES
  // ================================
  AUTH_ME: {
    PROFILE: `${API_BASE_URL}/auth/me/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/auth/me/profile`, // PATCH
    UPLOAD_CV: `${API_BASE_URL}/auth/me/cv`,
    UPLOAD_PHOTO: `${API_BASE_URL}/auth/me/photo`,
    UPLOAD_LOGO: `${API_BASE_URL}/auth/me/logo`,
  },

  // ================================
  // ADMIN ROUTES
  // ================================
  ADMIN: {
    LOGS: `${API_BASE_URL}/admin/logs`,
    LOGS_BY_REQUEST: (requestId: string | number) =>
      `${API_BASE_URL}/admin/logs/request/${requestId}`,
    LOG_STATS: `${API_BASE_URL}/admin/logs/stats`,
  },

  // ================================
  // COMPANY ROUTES
  // ================================
COMPANIES: {
    LIST: "/companies",
    SEARCH: "/companies/search",
    INDUSTRIES: "/companies/industries",
    TECH_ROLES: "/companies/tech-roles",
    STATS: "/companies/stats",
    DETAIL: (id: string | number) => `/companies/${id}`,
    CREATE: "/companies",
    UPDATE: (id: string | number) => `/companies/${id}`,
    DELETE: (id: string | number) => `/companies/${id}`,
    VALIDATE_LOGO: "/companies/validate-logo",
    UPLOAD_LOGO: (id: string | number) => `/companies/${id}/logo`,
    DELETE_LOGO: (id: string | number) => `/companies/${id}/logo`,
    GET_LOGO: (id: string | number) => `/companies/${id}/logo`,
  },

  // ================================
  // STUDENT ROUTES
  // ================================
  STUDENTS: {
    BASE: `${API_BASE_URL}/students`,
    LIST: `${API_BASE_URL}/students`,
    SEARCH: `${API_BASE_URL}/students/search`,
    STATUS: (status: string) => `${API_BASE_URL}/students/status/${status}`,
    UNIVERSITIES: `${API_BASE_URL}/students/universities`,
    MAJORS: `${API_BASE_URL}/students/majors`,
    INDUSTRIES: `${API_BASE_URL}/students/industries`,
    SKILLS: `${API_BASE_URL}/students/skills`,
    STATS: `${API_BASE_URL}/students/stats`,

    DETAIL: (id: string | number) => `${API_BASE_URL}/students/${id}`,
    CREATE: `${API_BASE_URL}/students`,
    UPDATE: (id: string | number) => `${API_BASE_URL}/students/${id}`,
    DELETE: (id: string | number) => `${API_BASE_URL}/students/${id}`,

    // FILE ROUTES
    UPLOAD_CV: (id: string | number) => `${API_BASE_URL}/students/${id}/cv`,
    UPLOAD_PHOTO: (id: string | number) =>
      `${API_BASE_URL}/students/${id}/photo`,

    DELETE_CV: (id: string | number) => `${API_BASE_URL}/students/${id}/cv`,
    DELETE_PHOTO: (id: string | number) =>
      `${API_BASE_URL}/students/${id}/photo`,

    GET_CV: (id: string | number) => `${API_BASE_URL}/students/${id}/cv`,
    GET_PHOTO: (id: string | number) => `${API_BASE_URL}/students/${id}/photo`,
  },

  // ================================
  // LOOKUP ROUTES
  // ================================
  LOOKUP: {
    INDUSTRIES: `${API_BASE_URL}/industries`,
    TECH_ROLES: `${API_BASE_URL}/tech-roles`,
    TECH_ROLE_CATEGORIES: `${API_BASE_URL}/tech-role-categories`,
    UNIVERSITIES: `${API_BASE_URL}/universities`,
    MAJORS: `${API_BASE_URL}/majors`,
    PREFERRED_INDUSTRIES: `${API_BASE_URL}/preferred-industries`,

    TECH_ROLES_BY_CATEGORY: (category: string) =>
      `${API_BASE_URL}/tech-roles/category/${category}`,

    SEARCH_INDUSTRIES: `${API_BASE_URL}/search/industries`,
    SEARCH_TECH_ROLES: `${API_BASE_URL}/search/tech-roles`,
    SEARCH_UNIVERSITIES: `${API_BASE_URL}/search/universities`,
    SEARCH_MAJORS: `${API_BASE_URL}/search/majors`,
    SEARCH_PREFERRED_INDUSTRIES: `${API_BASE_URL}/search/preferred-industries`,

    TECH_SKILL_SUGGESTIONS: `${API_BASE_URL}/suggestions/tech-skills`,
    VALIDATE_TECH_SKILLS: `${API_BASE_URL}/validate/tech-skills`,

    ALL_LOOKUP: `${API_BASE_URL}/lookup/all`,

    POPULAR_INDUSTRIES: `${API_BASE_URL}/popular/industries`,
    POPULAR_TECH_ROLES: `${API_BASE_URL}/popular/tech-roles`,
    POPULAR_TECH_SKILLS: `${API_BASE_URL}/popular/tech-skills`,
    POPULAR_UNIVERSITIES: `${API_BASE_URL}/popular/universities`,
    POPULAR_MAJORS: `${API_BASE_URL}/popular/majors`,
    POPULAR_PREFERRED_INDUSTRIES: `${API_BASE_URL}/popular/preferred-industries`,

    CACHE_CLEAR: `${API_BASE_URL}/cache/clear`,
    CACHE_STATUS: `${API_BASE_URL}/cache/status`,
  },

  
};
