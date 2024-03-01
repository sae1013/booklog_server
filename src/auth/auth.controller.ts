import { Controller, Get, Post, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // Guard 가 Google auth를 처리.
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() response) {
    response.cookie('jwt', req.jwt, { path: '/' });
    return response.redirect('http://localhost:3000/user/auth/callback');
  }

  @Get('logout')
  logout(@Req() request, @Res() response: Response) {
    return response.status(200).json({ message: '로그아웃 되었습니다.' });
  }
}
