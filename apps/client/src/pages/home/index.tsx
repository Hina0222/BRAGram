'use client';

import { Button } from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/store/auth-store';

export default function HomePage() {
  const router = useRouter();
  const { clearAuth } = useAuthStore();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => apiClient.post('/auth/logout'),
    onSettled: () => {
      clearAuth();
      router.replace('/signin');
    },
  });

  return (
    <div>
      <Button onClick={() => logout()} disabled={isPending}>
        Logout
      </Button>
    </div>
  );
}
