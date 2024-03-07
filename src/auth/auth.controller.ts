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
import { UserService } from 'src/user/user.service';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  @Render('login-success')
  async googleAuthRedirect(@Req() req, @Res() response) {
    const authenticatedInfo = req.user;

    try {
      // eslint-disable-next-line prefer-const
      let user = await this.userService.findOne(authenticatedInfo.email);
      if (user.channel != 'google') {
        return {
          user: null,
          errorMessage: '이미 다른 채널을 통해 가입된 계정입니다.',
          status: 400,
        };
      }
      if (!user) {
        user = await this.userService.signUpAndInitializeProfile({
          email: authenticatedInfo.email,
          name: authenticatedInfo.lastName + '' + authenticatedInfo.firstName,
          channel: 'google',
          status: 'active',
        });
      }

      const jwtPayload = {
        id: user.id,
        accessToken: authenticatedInfo.accessToken,
        email: authenticatedInfo.email,
        status: 'active',
        channel: 'google',
      };

      const jwt = sign(jwtPayload, process.env.JWT_KEY, { expiresIn: '24h' });
      response.cookie('jwt', jwt, { secure: true });
      response.cookie('refreshToken', authenticatedInfo.refreshToken, {
        secure: true,
      });
      return { successMessage: '로그인에 성공하였습니다', status: 200 };
    } catch (err) {
      //TODO Nest js 에서 err 객체와 상태값 체크해야 합니다.
      return { user: null, status: err.status, errorMessage: err.message };
    }
  }

  @Get('logout')
  logout(@Req() request, @Res() response: Response) {
    return response.status(200).json({ message: '로그아웃 되었습니다.' });
  }
}
