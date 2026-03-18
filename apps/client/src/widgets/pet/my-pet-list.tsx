'use client';

import { useGetPetsSuspenseQuery } from '@/features/pet/list/api/useGetPetsQuery';
import { withErrorBoundary, withSuspense } from '@/shared/boundary';
import { PetList, PetListError, PetListSkeleton } from '@/features/pet/list/ui';

function MyPetList() {
  const { data: pets } = useGetPetsSuspenseQuery();
  return <PetList pets={pets} getPetHref={id => `/my/pets/${id}`} />;
}

export default withErrorBoundary(withSuspense(MyPetList, <PetListSkeleton />), PetListError);
