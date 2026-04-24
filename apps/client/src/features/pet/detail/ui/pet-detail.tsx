'use client';

import { Button } from '@/shared/ui/button';
import { useActivatePetMutation } from '@/features/pet/edit/api/useActivatePetMutation';
import { useGetPetSuspenseQuery } from '@/features/pet/detail/api/useGetPetQuery';
import { withErrorBoundary, withSuspense } from '@/shared/boundary';
import { PetDetailError, PetDetailSkeleton } from '@/features/pet/detail/ui';
import { Trash2 } from 'lucide-react';
import { useDeletePetMutation } from '@/features/pet/delete/api/useDeletePetMutation';
import { useTranslations } from 'next-intl';

interface PetDetailProps {
  id: number;
}

function PetDetail({ id }: PetDetailProps) {
  const t = useTranslations('pet');
  const tc = useTranslations('common');
  const { data: pet } = useGetPetSuspenseQuery(id);
  const { mutate: activatePet, isPending } = useActivatePetMutation();
  const { mutate: deletePet } = useDeletePetMutation();

  return (
    <section className="flex flex-col gap-px px-5">
      <Button
        variant="outline"
        size="sm"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          deletePet(pet.id);
        }}
        className="mt-1 w-full border-destructive/40 text-destructive hover:bg-destructive/5 hover:text-destructive"
      >
        <Trash2 size={13} />
        {t('deleteButton')}
      </Button>
      {!pet.isRepresentative && (
        <Button
          variant="outline"
          onClick={() => activatePet(id)}
          disabled={isPending}
          className="mt-2 w-full"
          size="lg"
        >
          {isPending ? tc('processing') : t('setRepresentative')}
        </Button>
      )}
    </section>
  );
}

export default withErrorBoundary(withSuspense(PetDetail, <PetDetailSkeleton />), PetDetailError);
