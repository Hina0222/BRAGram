import { useInfiniteQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { postQueryKeys } from '@/entities/post/model/post.query-key';
import { apiClient } from '@/shared/api';
import { API_ROUTES } from '@/shared/api/api-routes.constants';
import type { CalendarPostListResponse } from '@pawboo/schemas/post';

export const getMyPosts = async (params?: {
  cursor?: number;
}): Promise<CalendarPostListResponse> => {
  return apiClient.get<CalendarPostListResponse>(API_ROUTES.POSTS.GET_MY_POSTS.URL, { params });
};

export const getMyPostsInfiniteQueryOptions = () => {
  return {
    queryKey: postQueryKeys.myPosts(),
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
      getMyPosts({ cursor: pageParam || undefined }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CalendarPostListResponse) =>
      lastPage.hasNext ? lastPage.cursor : undefined,
  };
};

export const useGetMyPostsInfiniteQuery = () => {
  return useInfiniteQuery(getMyPostsInfiniteQueryOptions());
};

export const useGetMyPostsSuspenseInfiniteQuery = () => {
  return useSuspenseInfiniteQuery(getMyPostsInfiniteQueryOptions());
};
