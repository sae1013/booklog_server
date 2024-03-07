import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  handleGetProfileByUserId(@Req() req) {
    this.profileService.findUserWithProfileByUserId(req.user.id);
  }
}
