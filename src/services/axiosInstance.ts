// src/services/axiosInstance.ts
import axios from "axios";
import { API_BASE_URL } from "@/services/apiPath";
import { useAuthStore } from "@/store/authStore";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ======================
// REQUEST INTERCEPTOR
// ======================
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// ======================
// RESPONSE INTERCEPTOR
// ======================
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    const { refreshToken, setAuth, clearAuth } = useAuthStore.getState();

    if (!refreshToken) {
      clearAuth();
      return Promise.reject(error);
    }

    try {
      const resp = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      const newToken = resp.data.data.accessToken;

      setAuth({ accessToken: newToken });

      original.headers.Authorization = `Bearer ${newToken}`;

      return axiosInstance(original);
    } catch {
      clearAuth();
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
