import { Skeleton } from '@/shared/ui';

function PetDetailSkeleton() {
  return (
    <div className="mt-1 grid w-full gap-2">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export default PetDetailSkeleton;
