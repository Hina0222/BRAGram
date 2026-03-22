'use client';

import { Star } from 'lucide-react';
import { Skeleton } from '@/shared/ui';
import { useGetPublicPetSuspenseQuery } from '@/features/pet/detail/api/useGetPublicPetQuery';
import { withErrorBoundary, withSuspense } from '@/shared/boundary';
import PetDetailError from './pet-detail-error';

const PET_TYPE_LABEL = { dog: '강아지', cat: '고양이' } as const;
const GENDER_LABEL = { male: '수컷', female: '암컷' } as const;

interface PublicPetInfoProps {
  userId: number;
  petId: number;
}

function PublicPetInfo({ userId, petId }: PublicPetInfoProps) {
  const { data: pet } = useGetPublicPetSuspenseQuery(userId, petId);

  return (
    <>
      <section className="mx-5 mt-4 mb-6 flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-3xl">
          {pet.imageUrl ? (
            <img src={pet.imageUrl} alt={pet.name} className="h-full w-full object-cover" />
          ) : pet.type === 'dog' ? (
            '🐶'
          ) : (
            '🐱'
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-base font-semibold text-foreground">{pet.name}</span>
            {pet.isActive && (
              <span className="flex items-center gap-0.5 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
                <Star size={10} className="fill-current" />
                대표
              </span>
            )}
          </div>
          <span className="mt-0.5 inline-block rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
            {PET_TYPE_LABEL[pet.type]}
          </span>
        </div>
      </section>

      <section className="flex flex-col gap-px px-5">
        <InfoRow label="품종" value={pet.breed} />
        <InfoRow label="생년월일" value={pet.birthDate} />
        <InfoRow label="성별" value={pet.gender ? GENDER_LABEL[pet.gender] : null} />
        <InfoRow label="소개" value={pet.bio} />
        <InfoRow label="총 점수" value={String(pet.score)} />
        <InfoRow label="주간 점수" value={String(pet.weeklyScore)} />
        <InfoRow label="월간 점수" value={String(pet.monthlyScore)} />
      </section>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-3 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground">{value ?? '-'}</span>
    </div>
  );
}

function PublicPetInfoSkeleton() {
  return (
    <>
      <div className="mx-5 mt-4 mb-6 flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
        <Skeleton className="size-16 shrink-0 rounded-full" />
        <div className="grid w-full gap-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
      <div className="mt-1 grid w-full gap-2 px-5">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </>
  );
}

export default withErrorBoundary(
  withSuspense(PublicPetInfo, <PublicPetInfoSkeleton />),
  PetDetailError
);
