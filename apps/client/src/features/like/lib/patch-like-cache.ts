import type { InfiniteData } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/api';
import { postQueryKeys } from '@/entities/post/model/post.query-key';
import type { LikeResponse } from '@pawboo/schemas/like';
import type { CalendarPostListResponse, PostDetail } from '@pawboo/schemas/post';

export function patchLikeInCaches(postId: number, { likeCount, isLiked }: LikeResponse) {
  const queryClient = getQueryClient();

  queryClient.setQueriesData<InfiniteData<CalendarPostListResponse>>(
    { queryKey: postQueryKeys.calendar() },
    old => {
      if (!old) return old;
      return {
        ...old,
        pages: old.pages.map(page => ({
          ...page,
          data: page.data.map(item =>
            item.id === postId ? { ...item, likeCount, isLiked } : item
          ),
        })),
      };
    }
  );

  queryClient.setQueryData<PostDetail>(postQueryKeys.detail(postId), old =>
    old ? { ...old, likeCount, isLiked } : old
  );
}
