import { create } from "zustand";

interface AuthState {
  auth: any | null;
  isAuthLoaded: boolean;
  setAuth: (auth: any) => void;
  loadAuthFromStorage: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  auth: null,
  isAuthLoaded: false,

  setAuth: (auth) => {
    localStorage.setItem("auth", JSON.stringify(auth));
    set({ auth, isAuthLoaded: true });
  },

  loadAuthFromStorage: () => {
    const raw = localStorage.getItem("auth");
    if (raw) {
      set({ auth: JSON.parse(raw), isAuthLoaded: true });
    } else {
      set({ isAuthLoaded: true });
    }
  },

  clearAuth: () => {
    localStorage.removeItem("auth");
    set({ auth: null, isAuthLoaded: true });
  },
}));

