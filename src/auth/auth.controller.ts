import {
  Controller,
  Get,
  Post,
  Render,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  @Render('login-success')
  googleAuthRedirect(@Req() req, @Res() response) {
    const user = req.user;
    const payload = {
      email: user.email,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      method: 'google',
    };
    const jwt = sign(payload, process.env.JWT_KEY, { expiresIn: '6h' });
    const authData = JSON.stringify({
      token: jwt,
      user: payload,
    });
    response.cookie('user', 'asdfwef', { secure: true });
    return { authData };
  }

  @Get('logout')
  logout(@Req() request, @Res() response: Response) {
    return response.status(200).json({ message: '로그아웃 되었습니다.' });
  }
}
