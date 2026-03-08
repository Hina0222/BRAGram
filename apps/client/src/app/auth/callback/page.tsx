'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    if (accessToken) {
      console.log('accessToken:', accessToken);
      router.replace('/');
    }
  }, [router]);

  return <div>로그인 처리 중...</div>;
}
