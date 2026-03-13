import type { FallbackProps } from 'react-error-boundary';

function PetProfileCardError({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="px-5 py-4 text-sm text-destructive">
      <p>펫 프로필 정보를 불러오지 못했어요.</p>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </div>
  );
}

export default PetProfileCardError;
