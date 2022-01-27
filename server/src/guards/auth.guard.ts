import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

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
      const decodedToken = this.authService.verifyToken(token);
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
