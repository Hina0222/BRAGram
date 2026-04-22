import { Test, TestingModule } from '@nestjs/testing';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.type';
import type { LikeResponse } from '@pawboo/schemas/like';

describe('LikeController', () => {
  let controller: LikeController;
  let service: jest.Mocked<LikeService>;

  const mockLikeResponse: LikeResponse = {
    likeCount: 5,
    isLiked: true,
  };

  beforeEach(async () => {
    const mockService = {
      addLike: jest.fn(),
      removeLike: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeController],
      providers: [
        {
          provide: LikeService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<LikeController>(LikeController);
    service = module.get<jest.Mocked<LikeService>>(LikeService);
  });

  describe('POST /feeds/:postId/likes', () => {
    it('좋아요 추가', async () => {
      service.addLike.mockResolvedValue(mockLikeResponse);

      const req = {
        user: { id: 1 },
      } as AuthenticatedRequest;

      const result = await controller.addLike(req, 1);

      expect(result).toEqual(mockLikeResponse);
      expect(service.addLike).toHaveBeenCalledWith(1, 1);
    });

    it('userId와 postId 정상 전달', async () => {
      service.addLike.mockResolvedValue({ likeCount: 1, isLiked: true });

      const req = {
        user: { id: 42 },
      } as AuthenticatedRequest;

      await controller.addLike(req, 99);

      expect(service.addLike).toHaveBeenCalledWith(42, 99);
    });
  });

  describe('DELETE /feeds/:postId/likes', () => {
    it('좋아요 제거', async () => {
      const unlikeResponse: LikeResponse = {
        likeCount: 4,
        isLiked: false,
      };
      service.removeLike.mockResolvedValue(unlikeResponse);

      const req = {
        user: { id: 1 },
      } as AuthenticatedRequest;

      const result = await controller.removeLike(req, 1);

      expect(result).toEqual(unlikeResponse);
      expect(service.removeLike).toHaveBeenCalledWith(1, 1);
    });

    it('userId와 postId 정상 전달', async () => {
      service.removeLike.mockResolvedValue({ likeCount: 0, isLiked: false });

      const req = {
        user: { id: 42 },
      } as AuthenticatedRequest;

      await controller.removeLike(req, 99);

      expect(service.removeLike).toHaveBeenCalledWith(42, 99);
    });
  });
});
