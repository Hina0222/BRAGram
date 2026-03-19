import { ReactNode } from 'react';
import { connection } from 'next/server';
import { getQueryClient } from '@/shared/api';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

/* eslint-disable @typescript-eslint/no-explicit-any */
type QueryOption = {
  queryKey: readonly unknown[];
  queryFn: any;
  initialPageParam?: any;
  getNextPageParam?: any;
  [key: string]: any;
};

interface ServerFetchBoundaryProps {
  children: ReactNode;
  queryOptions: QueryOption | QueryOption[];
}

export const ServerFetchBoundary = async ({ children, queryOptions }: ServerFetchBoundaryProps) => {
  await connection();
  const queryClient = getQueryClient();
  const optionsArray = Array.isArray(queryOptions) ? queryOptions : [queryOptions];

  await Promise.all(
    optionsArray.map(options => {
      if ('initialPageParam' in options) {
        return queryClient.prefetchInfiniteQuery(options as any);
      }
      return queryClient.prefetchQuery(options);
    })
  );

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};
