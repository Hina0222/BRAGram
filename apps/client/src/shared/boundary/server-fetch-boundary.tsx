import { ReactNode } from 'react';
import { connection } from 'next/server';
import { getQueryClient } from '@/shared/api';
import {
  dehydrate,
  FetchInfiniteQueryOptions,
  FetchQueryOptions,
  HydrationBoundary,
  QueryKey,
} from '@tanstack/react-query';

export type FetchOptions = Pick<FetchQueryOptions, 'queryKey' | 'queryFn'>;
export type FetchInfiniteOptions = Pick<
  FetchInfiniteQueryOptions<unknown, Error, unknown, QueryKey, number>,
  'queryKey' | 'queryFn' | 'initialPageParam'
>;

interface ServerFetchBoundaryProps {
  children: ReactNode;
  queryOptions?: FetchOptions | FetchOptions[];
  infiniteQueryOptions?: FetchInfiniteOptions | FetchInfiniteOptions[];
}

export const ServerFetchBoundary = async ({
  children,
  queryOptions,
  infiniteQueryOptions,
}: ServerFetchBoundaryProps) => {
  await connection();
  const queryClient = getQueryClient();

  const queries = queryOptions ? (Array.isArray(queryOptions) ? queryOptions : [queryOptions]) : [];
  const infiniteQueries = infiniteQueryOptions
    ? Array.isArray(infiniteQueryOptions)
      ? infiniteQueryOptions
      : [infiniteQueryOptions]
    : [];

  queries.forEach(opt => {
    queryClient.prefetchQuery(opt);
  });

  infiniteQueries.forEach(opt => {
    queryClient.prefetchInfiniteQuery(opt);
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};
