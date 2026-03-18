'use client';

import { useGetUserProfileSuspenseQuery } from '@/features/user/profile/api/useGetUserProfileQuery';
import { withErrorBoundary, withSuspense } from '@/shared/boundary';
import { PetList, PetListError, PetListSkeleton } from '@/features/pet/list/ui';

function UserPetList({ userId }: { userId: number }) {
  const { data: profile } = useGetUserProfileSuspenseQuery(userId);
  return <PetList pets={profile.pets} getPetHref={id => `/community/${id}`} />;
}

export default withErrorBoundary(withSuspense(UserPetList, <PetListSkeleton />), PetListError);
