import { PetList } from '@/features/pet/list/ui';
import { ServerFetchBoundary } from '@/shared/boundary';
import { getPetsQueryOptions } from '@/features/pet/list/api/useGetPetsQuery';

export default function MyPetsPage() {
  return (
    <>
      <ServerFetchBoundary queryOptions={getPetsQueryOptions()}>
        <PetList />
      </ServerFetchBoundary>
    </>
  );
}
