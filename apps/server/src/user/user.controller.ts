import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.type';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: AuthenticatedRequest) {
    const user = await this.userService.findById(req.user.id);
    return {
      id: user.id,
      nickname: user.nickname,
      profileImage: user.profileImage ?? null,
    };
  }
}
