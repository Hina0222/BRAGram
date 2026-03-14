'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient, getQueryClient } from '@/shared/api';
import { API_ROUTES } from '@/shared/api/api-routes.constants';
import { commentQueryKeys } from '@/entities/comment/model/comment.query-key';
import { toast } from 'sonner';

export const deleteComment = async ({
  submissionId,
  commentId,
}: {
  submissionId: number;
  commentId: number;
}): Promise<void> => {
  return apiClient.delete<void>(API_ROUTES.FEEDS.DELETE_COMMENT.URL(submissionId, commentId));
};

export const deleteCommentMutationOptions = (submissionId: number) => {
  const queryClient = getQueryClient();

  return {
    mutationFn: (commentId: number) => deleteComment({ submissionId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentQueryKeys.list(submissionId) });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  };
};

export const useDeleteCommentMutation = (submissionId: number) => {
  return useMutation(deleteCommentMutationOptions(submissionId));
};
