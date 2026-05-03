'use client';

import { Link } from '@/app/i18n/navigation';
import { useGetTodayMissionSuspenseQuery } from '@/features/mission/today/api/useGetTodayMissionQuery';
import { withErrorBoundary, withSuspense } from '@/shared/boundary';
import { MissionCardError, MissionCardSkeleton } from '@/features/mission/today/ui/mission-card';

function MissionCard() {
  const { data } = useGetTodayMissionSuspenseQuery();
  const { mission, submitted } = data;

  const isDone = submitted;

  if (!mission) {
    return null;
  }

  return (
    <section className="rounded-[10px] bg-[#333333] px-4.5 py-5.5">
      <div className="flex items-center justify-between gap-7 max-[320px]:flex-col max-[320px]:items-start max-[320px]:gap-5">
        {/* 미션 내용 */}
        <div className="flex-1 space-y-1">
          <h2 className="font-semibold text-[#E1E1E3]">{mission.title}</h2>
          <p className="text-xs font-normal text-[#E1E1E3] opacity-70">{mission.description}</p>
        </div>

        {/* 참여 버튼 */}
        {!isDone ? (
          <Link
            href={`/mission/${mission.id}/upload`}
            className="rounded-[10px] bg-[#FADF78] px-5 py-2.5 font-semibold text-[#131313]"
          >
            참여
          </Link>
        ) : (
          <button className="rounded-[10px] bg-[#4C4C4C] px-5 py-2.5 font-semibold text-[#999999]">
            참여
          </button>
        )}
      </div>
    </section>
  );
}

export default withErrorBoundary(
  withSuspense(MissionCard, <MissionCardSkeleton />),
  MissionCardError
);
