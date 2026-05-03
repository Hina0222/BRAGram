import { Header } from '@/widgets/header';
import { SubmitMissionForm } from './ui/submit-mission-form';

interface MissionUploadPageProps {
  params: Promise<{ missionId: string }>;
}

export default async function MissionUploadPage({ params }: MissionUploadPageProps) {
  const { missionId: missionIdParam } = await params;
  const missionId = Number(missionIdParam);

  return (
    <>
      <Header>
        <Header.Left>
          <Header.Back />
        </Header.Left>
        <Header.Center>
          <Header.Title>미션 업로드</Header.Title>
        </Header.Center>
      </Header>
      <SubmitMissionForm missionId={missionId} />
    </>
  );
}
