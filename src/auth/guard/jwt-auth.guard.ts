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

      // 만약 필요하다면, DB 부하를 고려해서 table에서 user정보 조회하고 request에 심어주세요.
      request.user = {
        user_id: decoded.user_id,
        name: decoded.name,
      };
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }
}
