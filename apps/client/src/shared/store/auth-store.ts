import { create } from 'zustand';
import type { MeResponse } from '@bragram/schemas';

interface AuthState {
  user: MeResponse | null;
  accessToken: string | null;
  isInitialized: boolean;
  setAuth: (accessToken: string, user: MeResponse) => void;
  setAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
  setInitialized: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  accessToken: null,
  isInitialized: false,
  setAuth: (accessToken, user) => set({ accessToken, user }),
  setAccessToken: accessToken => set({ accessToken }),
  clearAuth: () => set({ user: null, accessToken: null }),
  setInitialized: () => set({ isInitialized: true }),
}));
