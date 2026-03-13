import type { FallbackProps } from 'react-error-boundary';

function PetDetailError({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="px-5 py-4 text-sm text-destructive">
      <p>펫 정보를 불러오지 못했어요.</p>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </div>
  );
}

export default PetDetailError;
