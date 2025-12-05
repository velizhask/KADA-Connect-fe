import axios from "axios";
import { API_BASE_URL } from "@/services/apiPath";
import { useAuthStore } from "@/auth/store/authStore";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // true if backend use cookie session
});


// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    // ambil auth state langsung dari Zustand (real-time)
    const auth = useAuthStore.getState().auth;

    if (auth?.access_token) {
      config.headers.Authorization = `Bearer ${auth.access_token}`;
    }

    // tetap pakai X-Admin-Key jika ada
    const adminKey = localStorage.getItem("x-admin-key");
    if (adminKey) {
      config.headers["X-Admin-Key"] = adminKey;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error("Network error:", error.message);
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const store = useAuthStore.getState();
      const auth = store.auth;

      if (!auth?.refresh_token) {
        console.warn("No refresh token — skipping refresh flow");
        store.clearAuth();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refresh_token: auth.refresh_token,
        });

        const newToken = res.data?.access_token;

        if (newToken) {
          // Update Zustand
          store.setAuth({
            ...auth,
            access_token: newToken,
          });

          // Inject token ulang ke request awal
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        store.clearAuth();
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
