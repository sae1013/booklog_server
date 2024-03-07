import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { jwtPayload } from './types/auth-guard';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const token = request.cookies['jwt'];
      if (!token) {
        return false;
      }
      const decoded = jwt.verify(token, process.env.JWT_KEY) as jwtPayload;

      /*
        NOTE: 만약 profile 정보가 부득이하게 필요하면, 쿼리조회를 고려해서 삽입해주세요.
        If not, 구현체에서 직접 쿼리하는것이 유리합니다.
      */
      const { id, email, status, accessToken } = decoded;

      request.user = {
        id,
        email,
        status,
        accessToken,
      };
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }
}
