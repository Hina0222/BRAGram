'use client';

import { useEffect } from 'react';
import { apiClient } from '@/shared/api';
import { useAuthStore } from '@/shared/store/auth-store';
import type { MeResponse } from '@bragram/schemas/user';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { setAuth, clearAuth, setInitialized } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      try {
        await apiClient.post('/auth/refresh');
        const user = await apiClient.get<MeResponse>('/users/me');
        setAuth(user);
      } catch {
        clearAuth();
      } finally {
        setInitialized();
      }
    };
    init();
  }, []);

  return <>{children}</>;
}
