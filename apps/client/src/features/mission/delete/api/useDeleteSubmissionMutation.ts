'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient, getQueryClient } from '@/shared/api';
import { API_ROUTES } from '@/shared/api/api-routes.constants';
import { missionQueryKeys } from '@/entities/mission/model/mission.query-key';
import { toast } from 'sonner';

export const deleteSubmission = async ({
  missionId,
  submissionId,
}: {
  missionId: number;
  submissionId: number;
}): Promise<void> => {
  return apiClient.delete<void>(API_ROUTES.MISSIONS.DELETE_SUBMISSION.URL(missionId, submissionId));
};

export const deleteSubmissionMutationOptions = () => {
  const queryClient = getQueryClient();

  return {
    mutationFn: deleteSubmission,
    onSuccess: () => {
      toast.success('제출을 삭제했습니다.');
      queryClient.invalidateQueries({ queryKey: missionQueryKeys.today() });
      queryClient.invalidateQueries({ queryKey: missionQueryKeys.history() });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  };
};

export const useDeleteSubmissionMutation = () => {
  return useMutation(deleteSubmissionMutationOptions());
};
