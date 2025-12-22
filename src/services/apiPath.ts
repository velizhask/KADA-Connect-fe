export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const API_PATHS = {
  // AUTH ROUTES
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
    ME_LEGACY: `${API_BASE_URL}/auth/me`, // legacy
  },

  // AUTH / ME ROUTES (CURRENT USER)
  AUTH_ME: {
    PROFILE: `${API_BASE_URL}/auth/me/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/auth/me/profile`,

    // STUDENT ONLY
    UPLOAD_CV: `${API_BASE_URL}/auth/me/cv`,
    UPLOAD_PHOTO: `${API_BASE_URL}/auth/me/photo`,

    // COMPANY ONLY
    UPLOAD_LOGO: `${API_BASE_URL}/auth/me/logo`,
  },

  // ADMIN ROUTES
  ADMIN: {
    LOGS: `${API_BASE_URL}/admin/logs`,
    LOGS_BY_REQUEST: (requestId: string) =>
      `${API_BASE_URL}/admin/logs/request/${requestId}`,
    LOG_STATS: `${API_BASE_URL}/admin/logs/stats`,
  },

  // COMPANIES ROUTES
  COMPANIES: {
    LIST: `${API_BASE_URL}/companies`,
    SEARCH: `${API_BASE_URL}/companies/search`,
    INDUSTRIES: `${API_BASE_URL}/companies/industries`,
    TECH_ROLES: `${API_BASE_URL}/companies/tech-roles`,
    STATS: `${API_BASE_URL}/companies/stats`,

    DETAIL: (id: string) => `${API_BASE_URL}/companies/${id}`,
    CREATE: `${API_BASE_URL}/companies`,
    UPDATE: (id: string) => `${API_BASE_URL}/companies/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/companies/${id}`,

    // FILES
    UPLOAD_LOGO: (id: string) => `${API_BASE_URL}/companies/${id}/logo`,
    DELETE_LOGO: (id: string) => `${API_BASE_URL}/companies/${id}/logo`,
    GET_LOGO: (id: string) => `${API_BASE_URL}/companies/${id}/logo`,

    // ADMIN ONLY
    BULK_APPROVE: `${API_BASE_URL}/companies/bulk-approve`,
  },

  // STUDENTS ROUTES
  STUDENTS: {
    LIST: `${API_BASE_URL}/students`,
    SEARCH: `${API_BASE_URL}/students/search`,
    STATUS: (status: string) =>
      `${API_BASE_URL}/students/status/${encodeURIComponent(status)}`,
    UNIVERSITIES: `${API_BASE_URL}/students/universities`,
    MAJORS: `${API_BASE_URL}/students/majors`,
    INDUSTRIES: `${API_BASE_URL}/students/industries`,
    SKILLS: `${API_BASE_URL}/students/skills`,
    STATS: `${API_BASE_URL}/students/stats`,

    DETAIL: (id: string) => `${API_BASE_URL}/students/${id}`,
    CREATE: `${API_BASE_URL}/students`,
    UPDATE: (id: string) => `${API_BASE_URL}/students/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/students/${id}`,

    // FILES
    UPLOAD_CV: (id: string) => `${API_BASE_URL}/students/${id}/cv`,
    DELETE_CV: (id: string) => `${API_BASE_URL}/students/${id}/cv`,
    GET_CV: (id: string) => `${API_BASE_URL}/students/${id}/cv`,

    UPLOAD_PHOTO: (id: string) => `${API_BASE_URL}/students/${id}/photo`,
    DELETE_PHOTO: (id: string) => `${API_BASE_URL}/students/${id}/photo`,
    GET_PHOTO: (id: string) => `${API_BASE_URL}/students/${id}/photo`,

    // ADMIN ONLY
    BULK_APPROVE: `${API_BASE_URL}/students/bulk-approve`,
  },

  // LOOKUP
  LOOKUP: {
    TECH_SKILL_SUGGESTIONS: `${API_BASE_URL}/suggestions/tech-skills`,

    POPULAR_INDUSTRIES: `${API_BASE_URL}/popular/industries`,
    POPULAR_TECH_ROLES: `${API_BASE_URL}/popular/tech-roles`,
    POPULAR_TECH_SKILLS: `${API_BASE_URL}/popular/tech-skills`,
    POPULAR_UNIVERSITIES: `${API_BASE_URL}/popular/universities`,
    POPULAR_MAJORS: `${API_BASE_URL}/popular/majors`,
    POPULAR_PREFERRED_INDUSTRIES: `${API_BASE_URL}/popular/preferred-industries`,

    // ADMIN
    CACHE_CLEAR: `${API_BASE_URL}/cache/clear`,
    CACHE_STATUS: `${API_BASE_URL}/cache/status`,
  },
};
