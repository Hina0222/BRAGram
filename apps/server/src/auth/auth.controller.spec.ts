import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response, Request as ExpressRequest } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { KakaoAuthGuard } from './guards/kakao-auth.guard';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.type';

const mockRes = () =>
  ({
    cookie: jest.fn(),
    clearCookie: jest.fn(),
    redirect: jest.fn(),
  }) as unknown as Response;

describe('AuthController', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  const mockAuthService = {
    login: jest.fn(),
    logoutByRefreshToken: jest.fn(),
    refreshTokens: jest.fn(),
    withdrawUser: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('http://localhost:3001'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(KakaoAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<jest.Mocked<AuthService>>(AuthService);

    jest.clearAllMocks();
  });

  describe('kakaoCallback', () => {
    it('로그인 후 쿠키 설정 및 클라이언트로 redirect', async () => {
      service.login.mockResolvedValue({
        accessToken: 'access',
        refreshToken: 'refresh',
      });
      const req = { user: { id: 1, kakaoId: '12345', nickname: '닉네임' } };
      const res = mockRes();

      await controller.kakaoCallback(req, res);

      expect(service.login).toHaveBeenCalledWith(req.user);
      expect(res.cookie).toHaveBeenCalledWith(
        'access_token',
        'access',
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 1000,
          path: '/',
        }),
      );
      expect(res.cookie).toHaveBeenCalledWith(
        'refreshToken',
        'refresh',
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 30 * 24 * 60 * 60 * 1000,
        }),
      );
      expect(res.redirect).toHaveBeenCalledWith(
        'http://localhost:3001/auth/callback',
      );
    });
  });

  describe('logout', () => {
    it('refreshToken 쿠키 있음 - logoutByRefreshToken 호출 후 쿠키 삭제', async () => {
      service.logoutByRefreshToken.mockResolvedValue(undefined);
      const req = {
        cookies: { refreshToken: 'some_token' },
      } as unknown as ExpressRequest;
      const res = mockRes();

      await controller.logout(req, res);

      expect(service.logoutByRefreshToken).toHaveBeenCalledWith('some_token');
      expect(res.clearCookie).toHaveBeenCalledTimes(2);
    });

    it('refreshToken 쿠키 없음 - logoutByRefreshToken 미호출, 쿠키만 삭제', async () => {
      const req = { cookies: {} } as unknown as ExpressRequest;
      const res = mockRes();

      await controller.logout(req, res);

      expect(service.logoutByRefreshToken).not.toHaveBeenCalled();
      expect(res.clearCookie).toHaveBeenCalledTimes(2);
    });
  });

  describe('refresh', () => {
    it('정상 갱신 - 새 토큰 쿠키 설정', async () => {
      service.refreshTokens.mockResolvedValue({
        accessToken: 'new_access',
        refreshToken: 'new_refresh',
      });
      const req = {
        cookies: { refreshToken: 'old_refresh' },
      } as unknown as ExpressRequest;
      const res = mockRes();

      await controller.refresh(req, res);

      expect(service.refreshTokens).toHaveBeenCalledWith('old_refresh');
      expect(res.cookie).toHaveBeenCalledWith(
        'access_token',
        'new_access',
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 1000,
          path: '/',
        }),
      );
      expect(res.cookie).toHaveBeenCalledWith(
        'refreshToken',
        'new_refresh',
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 30 * 24 * 60 * 60 * 1000,
        }),
      );
    });

    it('쿠키 없음 - UnauthorizedException', async () => {
      const req = { cookies: {} } as unknown as ExpressRequest;
      const res = mockRes();

      await expect(controller.refresh(req, res)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(service.refreshTokens).not.toHaveBeenCalled();
    });
  });

  describe('withdraw', () => {
    it('회원 탈퇴 후 쿠키 삭제', async () => {
      service.withdrawUser.mockResolvedValue(undefined);
      const req = { user: { id: 1 } } as AuthenticatedRequest;
      const res = mockRes();

      await controller.withdraw(req, res);

      expect(service.withdrawUser).toHaveBeenCalledWith(1);
      expect(res.clearCookie).toHaveBeenCalledTimes(2);
    });
  });
});
