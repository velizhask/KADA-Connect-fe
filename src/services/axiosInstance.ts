import axios from "axios";
import { API_BASE_URL } from "@/services/apiPath";
import { useAuthStore } from "@/store/authStore";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// REQUEST
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// RESPONSE (REFRESH TOKEN)
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    const { refreshToken, setSession, clearAuth, user } =
      useAuthStore.getState();

    if (!refreshToken || !user) {
      clearAuth();
      return Promise.reject(error);
    }

    try {
      const resp = await axiosInstance.post("/auth/refresh", {
        refreshToken,
      });

      const newAccessToken = resp.data.data.accessToken;

      setSession({
        accessToken: newAccessToken,
        refreshToken,
        user,
      });

      original.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance(original);
    } catch {
      clearAuth();
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
