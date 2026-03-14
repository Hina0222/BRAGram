import { TitleHeader, MissionTabNav } from '@/widgets/header';
import { BottomNav } from '@/widgets/bottom-nav';

export default function MissionTabsLayout({ tab }: { tab: React.ReactNode }) {
  return (
    <div className="pb-20">
      <TitleHeader title="미션" />
      <MissionTabNav />
      {tab}
      <BottomNav />
    </div>
  );
}
