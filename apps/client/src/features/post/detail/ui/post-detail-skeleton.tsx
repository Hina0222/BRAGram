import { Skeleton } from '@/shared/ui';

export function PostDetailSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 px-4 py-3">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-3.5 w-24" />
      </div>
      <Skeleton className="aspect-square w-full" />
      <div className="flex gap-2 px-4">
        <Skeleton className="h-7 w-14" />
        <Skeleton className="h-7 w-14" />
      </div>
    </div>
  );
}
