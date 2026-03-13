import { Skeleton } from '@/shared/ui';

function PetProfileCardSkeleton() {
  return (
    <div className="flex w-full items-center gap-4">
      <Skeleton className="size-14 shrink-0 rounded-full" />
      <div className="grid w-full gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export default PetProfileCardSkeleton;
