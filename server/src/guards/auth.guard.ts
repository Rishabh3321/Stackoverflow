import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import jwtConfig from 'src/config/jwt.config';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.header('Authorization');
    console.log(request.headers);
    if (!token) {
      throw new HttpException(
        'Authentication invalid.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const decodedToken = jwt.verify(token.slice(7), jwtConfig.secret, {
        algorithm: 'HS256',
        expiresIn: jwtConfig.expiresIn,
      });
      console.log(decodedToken);
      request['user'] = decodedToken;
      return true;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Authentication invalid.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
