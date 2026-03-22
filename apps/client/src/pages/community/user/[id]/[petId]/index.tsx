import { BackHeader } from '@/widgets/header';
import { BottomNav } from '@/widgets/bottom-nav';
import { ServerFetchBoundary } from '@/shared/boundary/server-fetch-boundary';
import { getPublicPetQueryOptions } from '@/features/pet/detail/api/useGetPublicPetQuery';
import { PublicPetInfo, PublicPetMissions } from '@/features/pet/detail/ui';

interface PetProfilePageProps {
  params: Promise<{ id: string; petId: string }>;
}

export default async function PetProfilePage({ params }: PetProfilePageProps) {
  const { id, petId } = await params;
  const userId = Number(id);
  const petIdNum = Number(petId);

  return (
    <div className="pb-20">
      <BackHeader title="펫 프로필" />
      <ServerFetchBoundary queryOptions={getPublicPetQueryOptions(userId, petIdNum)}>
        <PublicPetInfo userId={userId} petId={petIdNum} />
      </ServerFetchBoundary>

      <section className="mt-6 px-5">
        <h2 className="mb-4 text-sm font-semibold text-foreground">미션 이력</h2>
        <PublicPetMissions userId={userId} petId={petIdNum} />
      </section>

      <BottomNav />
    </div>
  );
}
