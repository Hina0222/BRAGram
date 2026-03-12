import { ReactNode } from 'react';
import { getQueryClient } from '@/shared/api';
import { dehydrate, FetchQueryOptions, HydrationBoundary } from '@tanstack/react-query';

interface ServerFetchBoundaryProps {
  children: ReactNode;
  queryOptions: FetchQueryOptions;
}

export const ServerFetchBoundary = ({ children, queryOptions }: ServerFetchBoundaryProps) => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(queryOptions);

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};
