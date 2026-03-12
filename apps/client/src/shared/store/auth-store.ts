import { create } from 'zustand';
import type { MeResponse } from '@bragram/schemas/user';

interface AuthState {
  user: MeResponse | null;
  isInitialized: boolean;
  setAuth: (user: MeResponse) => void;
  clearAuth: () => void;
  setInitialized: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isInitialized: false,
  setAuth: user => set({ user }),
  clearAuth: () => set({ user: null }),
  setInitialized: () => set({ isInitialized: true }),
}));
