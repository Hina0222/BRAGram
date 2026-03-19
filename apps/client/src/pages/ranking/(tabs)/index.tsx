import { RankingList } from '@/features/ranking/list/ui';
import { ServerFetchBoundary } from '@/shared/boundary/server-fetch-boundary';
import { getRankingsInfiniteQueryOptions } from '@/features/ranking/list/api/useGetRankingsInfiniteQuery';

export default async function RankingAllPage() {
  return (
    <ServerFetchBoundary infiniteQueryOptions={getRankingsInfiniteQueryOptions('all')}>
      <RankingList type="all" />
    </ServerFetchBoundary>
  );
}
