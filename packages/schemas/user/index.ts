import {z} from "zod";

export const MeResponseSchema = z.object({
  id: z.number(),
  nickname: z.string().nullable(),
  profileImage: z.string().nullable(),
  followerCount: z.number(),
  followingCount: z.number(),
});

export const ProfileUpdateSchema = z.object({
  nickname: z.string().min(1).max(20).optional(),
});

export const UserProfileResponseSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profileImage: z.string().nullable(),
  followerCount: z.number(),
  followingCount: z.number(),
  isFollowing: z.boolean(),
  pets: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      imageUrl: z.string().nullable(),
      type: z.enum(['cat', 'dog']),
      isActive: z.boolean(),
    }),
  ),
});

export const SearchTypeSchema = z.enum(['user', 'pet']).default('user');

export const UserSearchQuerySchema = z.object({
  q: z.string().min(1, '1글자 이상 입력해주세요'),
  type: SearchTypeSchema,
  cursor: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().min(1).max(30).default(20),
});

export const UserSearchResponseSchema = z.object({
  type: z.literal('user'),
  data: z.array(
    z.object({
      id: z.number(),
      nickname: z.string(),
      profileImage: z.string().nullable(),
    }),
  ),
  hasNext: z.boolean(),
  cursor: z.number().nullable(),
});

export const PetSearchResponseSchema = z.object({
  type: z.literal('pet'),
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      type: z.enum(['cat', 'dog']),
      breed: z.string().nullable(),
      imageUrl: z.string().nullable(),
      ownerId: z.number(),
      ownerNickname: z.string(),
    }),
  ),
  hasNext: z.boolean(),
  cursor: z.number().nullable(),
});

export const SearchResponseSchema = z.discriminatedUnion('type', [
  UserSearchResponseSchema,
  PetSearchResponseSchema,
]);

export type MeResponse = z.infer<typeof MeResponseSchema>;
export type ProfileUpdateRequest = z.infer<typeof ProfileUpdateSchema>;
export type UserProfileResponse = z.infer<typeof UserProfileResponseSchema>;
export type SearchType = z.infer<typeof SearchTypeSchema>;
export type UserSearchQuery = z.infer<typeof UserSearchQuerySchema>;
export type UserSearchResponse = z.infer<typeof UserSearchResponseSchema>;
export type PetSearchResponse = z.infer<typeof PetSearchResponseSchema>;
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
