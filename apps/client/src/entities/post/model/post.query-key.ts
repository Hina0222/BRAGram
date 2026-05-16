import type { PostQuery } from '@pawboo/schemas/post';

export const postQueryKeys = {
  all: ['posts'] as const,
  list: (params?: Pick<PostQuery, 'missionId'>) => [...postQueryKeys.all, params] as const,
  details: () => [...postQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...postQueryKeys.details(), id] as const,
  calendar: () => [...postQueryKeys.all, 'calendar'] as const,
  myPosts: () => [...postQueryKeys.calendar(), 'me'] as const,
  petPosts: (petId: number) => [...postQueryKeys.calendar(), 'pet', petId] as const,
  liked: () => [...postQueryKeys.all, 'liked'] as const,
};
