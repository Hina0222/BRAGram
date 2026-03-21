import type { FallbackProps } from 'react-error-boundary';

export function UserProfileError({ resetErrorBoundary }: FallbackProps) {
  return (
    <section className="flex flex-col items-center justify-center px-5 py-10 text-muted-foreground">
      <p className="text-sm">프로필을 불러오지 못했습니다.</p>
      <button onClick={resetErrorBoundary} className="mt-2 text-xs text-red-400 underline">
        다시 시도
      </button>
    </section>
  );
}
