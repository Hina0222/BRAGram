import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MissionService } from './mission.service';
import {
  CreateSubmissionSchema,
  SubmissionHistoryQuerySchema,
  type SubmissionResponse,
  type TodayMissionResponse,
} from '@bragram/schemas/mission';

interface AuthenticatedRequest extends Request {
  user: { id: number; kakaoId: string };
}

const imageUploadOptions = {
  storage: memoryStorage(),
  fileFilter: (
    _req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new BadRequestException('JPEG, PNG, WEBP 이미지만 업로드 가능합니다.'),
        false,
      );
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 },
};

@UseGuards(JwtAuthGuard)
@Controller('missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Get('today')
  findToday(@Req() req: AuthenticatedRequest): Promise<TodayMissionResponse> {
    return this.missionService.findToday(req.user.id);
  }

  @Get('submissions/history')
  async findHistory(
    @Req() req: AuthenticatedRequest,
    @Query() query: Record<string, string>,
  ): Promise<SubmissionResponse[]> {
    const parsed = SubmissionHistoryQuerySchema.safeParse(query);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.issues);
    }
    return this.missionService.findHistory(req.user.id, parsed.data);
  }

  @Post(':missionId/submissions')
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  async submit(
    @Req() req: AuthenticatedRequest,
    @Param('missionId', ParseIntPipe) missionId: number,
    @Body() body: Record<string, unknown>,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<SubmissionResponse> {
    if (!file) {
      throw new BadRequestException('이미지를 업로드해주세요.');
    }

    const parsed = CreateSubmissionSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.issues);
    }

    return this.missionService.submitMission(
      req.user.id,
      missionId,
      file.buffer,
      parsed.data,
    );
  }

  @Delete(':missionId/submissions/:submissionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSubmission(
    @Req() req: AuthenticatedRequest,
    @Param('missionId', ParseIntPipe) missionId: number,
    @Param('submissionId', ParseIntPipe) submissionId: number,
  ): Promise<void> {
    return this.missionService.deleteSubmission(
      req.user.id,
      missionId,
      submissionId,
    );
  }
}
