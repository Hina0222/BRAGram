import { z } from 'zod';

export const MeResponseSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profileImage: z.string().nullable(),
});

export type MeResponse = z.infer<typeof MeResponseSchema>;
