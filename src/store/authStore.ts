import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  user: any | null;
  profile: any | null;

  isAuthLoaded: boolean;

  setAuth: (data: Partial<AuthState>) => void;
  clearAuth: () => void;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  role: null,
  user: null,
  profile: null,

  isAuthLoaded: false,

  setAuth: (data) =>
    set((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem("auth", JSON.stringify(updated));
      return updated;
    }),

  clearAuth: () => {
    localStorage.removeItem("auth");
    set({
      accessToken: null,
      refreshToken: null,
      role: null,
      user: null,
      profile: null,
      isAuthLoaded: true,
    });
  },

  loadFromStorage: () => {
    const raw = localStorage.getItem("auth");
    if (!raw) return set({ isAuthLoaded: true });

    try {
      const parsed = JSON.parse(raw);
      set({ ...parsed, isAuthLoaded: true });
    } catch {
      set({ isAuthLoaded: true });
    }
  },
}));
