import type { FeedQuery } from '@bragram/schemas/feed';

export const feedQueryKeys = {
  all: ['feeds'] as const,
  list: (params?: Pick<FeedQuery, 'sort'>) => [...feedQueryKeys.all, params] as const,
};
