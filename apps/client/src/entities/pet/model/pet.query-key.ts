export const petQueryKeys = {
  all: ['pets'] as const,
  details: () => [...petQueryKeys.all, 'detail'] as const,
  detail: (petId: number) => [...petQueryKeys.details(), petId] as const,
  publicDetail: (userId: number, petId: number) =>
    [...petQueryKeys.all, 'public', userId, petId] as const,
  submissions: (userId: number, petId: number) =>
    [...petQueryKeys.all, 'submissions', userId, petId] as const,
  search: (q: string) => [...petQueryKeys.all, 'search', q] as const,
};
