import type { FallbackProps } from 'react-error-boundary';

function PetListError({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="px-5 py-4 text-sm text-destructive">
      <p>목록을 불러오지 못했어요.</p>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </div>
  );
}

export default PetListError;
