'use client';

import { useGetPetsSuspenseQuery } from '@/features/pet/list/api/useGetPetsQuery';
import { withErrorBoundary, withSuspense } from '@/shared/boundary';
import { PetListError, PetListItem, PetListSkeleton } from '@/features/pet/list/ui';

function PetList() {
  const { data: pets } = useGetPetsSuspenseQuery();

  return (
    <ul className="flex flex-col gap-2 px-5">
      {pets.map(pet => (
        <PetListItem pet={pet} key={pet.id} />
      ))}
    </ul>
  );
}

export default withErrorBoundary(withSuspense(PetList, <PetListSkeleton />), PetListError);
