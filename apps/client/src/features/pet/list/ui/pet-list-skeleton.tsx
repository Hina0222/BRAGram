import { Skeleton } from '@/shared/ui';

function PetListSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="flex w-full flex-col gap-2" key={index}>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
}

export default PetListSkeleton;
