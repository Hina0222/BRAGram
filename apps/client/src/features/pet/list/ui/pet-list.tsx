'use client';

import { useGetPetsSuspenseQuery } from '@/features/pet/list/api/useGetPetsQuery';
import { withErrorBoundary, withSuspense } from '@/shared/boundary';
import { PetListError, PetListItem, PetListSkeleton } from '@/features/pet/list/ui';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

function PetList() {
  const { data: pets } = useGetPetsSuspenseQuery();
  const router = useRouter();

  return (
    <>
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button
          onClick={() => router.back()}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft size={24} />
        </button>
      </header>
      <ul className="flex flex-col gap-2 px-5">
        {pets?.map(pet => (
          <PetListItem pet={pet} key={pet.id} />
        ))}
      </ul>
    </>
  );
}

export default withErrorBoundary(withSuspense(PetList, <PetListSkeleton />), PetListError);
