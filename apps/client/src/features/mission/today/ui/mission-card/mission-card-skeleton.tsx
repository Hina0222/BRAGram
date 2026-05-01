import { Skeleton } from '@/shared/ui';

function MissionCardSkeleton() {
  return (
    <div className="rounded-[10px] bg-[#333333] px-4.5 py-5.5">
      <div className="flex items-center justify-between gap-7 max-[320px]:flex-col max-[320px]:items-start max-[320px]:gap-5">
        <div className="flex-1 space-y-1">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        {/* 참여 버튼 */}
        <Skeleton className="h-[44px] w-[68px]" />
      </div>
    </div>
  );
}

export default MissionCardSkeleton;
