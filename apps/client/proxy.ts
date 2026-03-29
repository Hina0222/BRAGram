import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/signin', '/auth/callback'];
const ONBOARDING_ROUTES = ['/onboarding'];

function decodeJwtPayload(token: string): { hasNickname?: boolean } | null {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 파일 제외
  if (
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(?:svg|png|jpg|jpeg|gif|webp|ico)$/)
  ) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get('refreshToken')?.value;
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
  const isOnboardingRoute = ONBOARDING_ROUTES.some(route => pathname.startsWith(route));

  // 로그인 상태에서 /signin 접근 → / 리다이렉트
  if (refreshToken && pathname === '/signin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 비로그인 상태에서 protected 라우트 접근 → /signin 리다이렉트
  if (!refreshToken && !isPublicRoute) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // 로그인 상태에서 닉네임 미등록 유저 보호 라우트 접근 → /onboarding/profile 리다이렉트
  if (refreshToken && !isPublicRoute && !isOnboardingRoute) {
    const accessToken = request.cookies.get('access_token')?.value;
    if (accessToken) {
      const payload = decodeJwtPayload(accessToken);
      if (payload && payload.hasNickname === false) {
        return NextResponse.redirect(new URL('/onboarding/profile', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
