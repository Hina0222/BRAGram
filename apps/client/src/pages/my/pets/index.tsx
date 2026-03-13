import { PetList } from '@/features/pet/list/ui';
import { ServerFetchBoundary } from '@/shared/boundary';
import { getPetsQueryOptions } from '@/features/pet/list/api/useGetPetsQuery';
import { BackHeader } from '@/widgets/header';

export default function MyPetsPage() {
  return (
    <>
      <BackHeader />
      <ServerFetchBoundary queryOptions={getPetsQueryOptions()}>
        <PetList />
      </ServerFetchBoundary>
    </>
  );
}
