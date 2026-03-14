import { z } from 'zod';
import { CreateSubmissionSchema } from '@bragram/schemas/mission';

export const SubmitMissionFormSchema = CreateSubmissionSchema.extend({
  image: z.instanceof(File, { message: '이미지를 업로드해주세요.' }),
  hashtags: z.array(z.string()).max(5, '해시태그는 최대 5개까지 입력할 수 있습니다').optional(),
});

export type SubmitMissionFormValues = z.infer<typeof SubmitMissionFormSchema>;
