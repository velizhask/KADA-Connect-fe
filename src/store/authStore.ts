import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  user: any | null;
  profile: any | null;

  isAuthLoaded: boolean;

  setAuth: (data: Partial<AuthState>) => void;
  setSession: (data: {
    accessToken: string;
    refreshToken?: string;
    user: any;
    profile?: any;
  }) => void;

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
      const updated = {
        ...prev,
        ...data,
        isAuthLoaded: true,
      };
      localStorage.setItem("auth", JSON.stringify(updated));
      return updated;
    }),

  setSession: ({ accessToken, refreshToken, user, profile }) =>
    set((prev) => {
      const updated = {
        ...prev,
        accessToken,
        refreshToken: refreshToken ?? prev.refreshToken,
        user,
        role: user?.role ?? prev.role,
        profile: profile ?? prev.profile,
        isAuthLoaded: true,
      };
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
    if (!raw) {
      set({ isAuthLoaded: true });
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      set({ ...parsed, isAuthLoaded: true });
    } catch {
      set({ isAuthLoaded: true });
    }
  },
}));
