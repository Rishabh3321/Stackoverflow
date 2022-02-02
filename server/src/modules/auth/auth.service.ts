import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  jwtConfig: { secret: string; expiresIn: string };

  constructor(private configService: ConfigService) {
    this.jwtConfig = {
      secret: this.configService.get('jwt.secret'),
      expiresIn: this.configService.get('jwt.expiresIn'),
    };
  }

  hashPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Generate a salt at level 12 strength
      bcrypt.genSalt(12, (err, salt) => {
        if (err) {
          reject(err);
        }
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          }
          resolve(hash);
        });
      });
    });
  };

  createToken = (user) => {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      this.jwtConfig.secret,
      { algorithm: 'HS256', expiresIn: this.jwtConfig.expiresIn },
    );
  };

  verifyPassword = async (passwordAttempt: string, hashedPassword: string) => {
    return await bcrypt.compare(passwordAttempt, hashedPassword);
  };

  verifyToken = (token: string) => {
    const decodedToken = jwt.verify(token.slice(7), this.jwtConfig.secret, {
      algorithm: 'HS256',
      expiresIn: this.jwtConfig.expiresIn,
    });
    return decodedToken;
  };
}
