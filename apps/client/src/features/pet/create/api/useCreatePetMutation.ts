'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient, getQueryClient } from '@/shared/api';
import { API_ROUTES } from '@/shared/api/api-routes.constants';
import { petQueryKeys } from '@/entities/pet/model/pet.query-key';
import type { CreatePetRequest, PetResponse } from '@bragram/schemas/pet';
import { toast } from 'sonner';
import { missionQueryKeys } from '@/entities/mission/model/mission.query-key';

type CreatePetParams = CreatePetRequest & { image?: File };

export const createPet = async ({ image, ...data }: CreatePetParams): Promise<PetResponse> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== '') formData.append(key, value);
  });
  if (image) formData.append('image', image);

  return apiClient.post<PetResponse>(API_ROUTES.PETS.CREATE_PET.URL, formData);
};

export const createPetMutationOptions = () => {
  const queryClient = getQueryClient();

  return {
    mutationFn: createPet,
    onSuccess: () => {
      toast.success('반려동물을 추가했습니다.');
      queryClient.invalidateQueries({ queryKey: petQueryKeys.details() });
      queryClient.invalidateQueries({ queryKey: missionQueryKeys.today() });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  };
};

export const useCreatePetMutation = () => {
  return useMutation(createPetMutationOptions());
};
