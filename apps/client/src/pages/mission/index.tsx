import { BottomNav } from '@/widgets/bottom-nav';
import { TitleHeader } from '@/widgets/header';
import { MissionCard } from '@/features/mission/today/ui/mission-card';
import { SubmissionCard } from '@/features/mission/today/ui/submission-card';

export default function MissionPage() {
  return (
    <div className="pb-20">
      <TitleHeader title="오늘의 미션" />

      <MissionCard />
      <SubmissionCard />

      <BottomNav />
    </div>
  );
}
