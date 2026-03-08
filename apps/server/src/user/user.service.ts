import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { DrizzleDB } from '../database/database.provider';
import { DRIZZLE_ORM } from '../database/database.provider';
import { users } from '../database/schema';

interface KakaoProfile {
  kakaoId: string;
  nickname: string;
  profileImage?: string;
}

@Injectable()
export class UserService {
  constructor(@Inject(DRIZZLE_ORM) private db: DrizzleDB) {}

  async findByKakaoId(kakaoId: string) {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.kakaoId, kakaoId))
      .limit(1);
    return result[0] ?? null;
  }

  async findById(id: number) {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return result[0] ?? null;
  }

  async findOrCreate(profile: KakaoProfile) {
    const existing = await this.findByKakaoId(profile.kakaoId);
    if (existing) return existing;

    const created = await this.db
      .insert(users)
      .values({
        kakaoId: profile.kakaoId,
        nickname: profile.nickname,
        profileImage: profile.profileImage,
      })
      .returning();
    return created[0];
  }

  async updateRefreshToken(id: number, refreshToken: string | null) {
    await this.db
      .update(users)
      .set({ refreshToken, updatedAt: new Date() })
      .where(eq(users.id, id));
  }
}
