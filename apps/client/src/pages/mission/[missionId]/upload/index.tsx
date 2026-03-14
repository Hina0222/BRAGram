import { BackHeader } from '@/widgets/header';
import { SubmitMissionForm } from '@/features/mission/submit/ui';

interface MissionUploadPageProps {
  params: Promise<{ missionId: string }>;
}

export default async function MissionUploadPage({ params }: MissionUploadPageProps) {
  const { missionId } = await params;

  return (
    <>
      <BackHeader title="미션 인증" />

      <SubmitMissionForm missionId={Number(missionId)} />
    </>
  );
}
