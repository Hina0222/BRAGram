export const userQueryKeys = {
  all: ['users'] as const,
  me: () => [...userQueryKeys.all, 'me'] as const,
  search: (q: string, type: string = 'user') => [...userQueryKeys.all, 'search', type, q] as const,
  profile: (id: number) => [...userQueryKeys.all, 'profile', id] as const,
  feeds: (id: number) => [...userQueryKeys.all, 'feeds', id] as const,
};
