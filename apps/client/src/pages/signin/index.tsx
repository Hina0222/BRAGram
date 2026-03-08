'use client';

import { Button } from '@/shared/ui';

export default function SigninPage() {
  const handleKakaoLogin = () => {
    // window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao`;
  };

  return (
    <div>
      <Button onClick={handleKakaoLogin}>카카오 로그인</Button>
    </div>
  );
}
