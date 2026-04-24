import { Skeleton } from '@/shared/ui';

export function PostListSkeleton() {
  return (
    <div className="flex flex-col gap-4 pt-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-2xl bg-card pb-4">
          <div className="flex items-center gap-2 p-4">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-3.5 w-20" />
          </div>
          <Skeleton className="aspect-square w-full" />
          <div className="flex gap-2 px-4">
            <Skeleton className="h-7 w-14" />
            <Skeleton className="h-7 w-14" />
          </div>
        </div>
      ))}
    </div>
  );
}
