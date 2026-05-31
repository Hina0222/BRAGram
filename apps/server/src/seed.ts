import * as dotenv from 'dotenv';
dotenv.config();

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { missions } from './database/schema/missions';

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

const missionData = [
  {
    scheduledAt: '2026-05-25',
    title: '아침 스트레칭 타임',
    description:
      '반려동물과 함께 가벼운 아침 스트레칭을 해보세요. 하루를 활기차게 시작해요!',
  },
  {
    scheduledAt: '2026-05-26',
    title: '인생 사진 찍기',
    description:
      '반려동물의 가장 귀여운 순간을 카메라에 담아보세요. 최고의 표정을 포착해봐요!',
  },
  {
    scheduledAt: '2026-05-27',
    title: '새 장난감 놀이',
    description:
      '새로운 장난감으로 신나게 놀아주세요. 처음 보는 장난감에 어떻게 반응할까요?',
  },
  {
    scheduledAt: '2026-05-28',
    title: '목욕 타임',
    description:
      '오늘은 깨끗하게 목욕시켜 주는 날! 향긋하고 보송보송하게 만들어 주세요.',
  },
  {
    scheduledAt: '2026-05-29',
    title: '새로운 산책 코스 탐험',
    description:
      '평소와 다른 새로운 길로 산책해보세요. 새로운 냄새와 풍경을 함께 즐겨요.',
  },
  {
    scheduledAt: '2026-05-30',
    title: '특별 간식 만들기',
    description:
      '반려동물을 위한 특별 간식을 직접 만들어보세요. 맛있게 먹는 모습을 공유해요!',
  },
  {
    scheduledAt: '2026-05-31',
    title: '함께하는 낮잠',
    description:
      '반려동물과 나란히 낮잠을 자보세요. 포근한 낮잠 타임을 기록해봐요.',
  },
  {
    scheduledAt: '2026-06-01',
    title: '브러싱 타임',
    description:
      '오늘은 털을 예쁘게 빗어주는 날! 빗질하며 교감하는 시간을 가져요.',
  },
  {
    scheduledAt: '2026-06-02',
    title: '공원 나들이',
    description:
      '가까운 공원에 나가 자연을 만끽해보세요. 푸른 잔디 위에서의 산책을 즐겨요.',
  },
  {
    scheduledAt: '2026-06-03',
    title: '재주 가르치기',
    description:
      '새로운 기술이나 명령어를 가르쳐보세요. 간식을 활용한 긍정 훈련으로 도전해봐요!',
  },
  {
    scheduledAt: '2026-06-04',
    title: '반려동물 놀이터 방문',
    description:
      '반려동물 전용 놀이터를 방문해보세요. 실컷 뛰어노는 모습을 담아봐요.',
  },
  {
    scheduledAt: '2026-06-05',
    title: '친구와 만남',
    description:
      '주변 반려동물 친구와 만남의 시간을 가져보세요. 사이좋게 노는 모습을 공유해요!',
  },
  {
    scheduledAt: '2026-06-06',
    title: '건강 체크 데이',
    description:
      '집에서 간단한 건강 체크를 해보세요. 귀, 발바닥, 이빨을 꼼꼼히 살펴봐요.',
  },
  {
    scheduledAt: '2026-06-07',
    title: '특별한 날 기념 사진',
    description:
      '오늘을 기념하는 특별한 사진을 찍어보세요. 소중한 하루를 추억으로 남겨요.',
  },
];

async function seed() {
  console.log('🌱 미션 데이터 삽입 중...');

  const inserted = await db
    .insert(missions)
    .values(missionData)
    .onConflictDoNothing()
    .returning();

  console.log(`✅ ${inserted.length}개 미션 삽입 완료 (중복 제외)`);
  await client.end();
}

seed().catch((err) => {
  console.error('❌ 에러:', err);
  process.exit(1);
});
