import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  //   RedirectException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // 인증 코드가 URL에 있는지 확인
    if (request.query.code) {
      // 인증 코드가 있으면 Guard가 인증 코드를 사용하여 토큰 교환 로직을 수행하도록 합니다.
      return super.canActivate(context);
    }
    // console.log(context);
    // 인증 코드가 없고 사용자가 이미 인증되지 않은 경우
    // Google 로그인 페이지로 리디렉트하기 위해 기본 Guard 동작을 사용합니다.
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
