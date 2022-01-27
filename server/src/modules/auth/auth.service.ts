import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export class AuthService {
  jwtConfig: { secret: string; expiresIn: string };

  constructor(private configService: ConfigService) {
    console.log(this.configService);
    this.jwtConfig = {
      secret: this.configService.get('jwt.secret'),
      expiresIn: this.configService.get('jwt.expiresIn'),
    };
    console.log(this.jwtConfig);
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
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      self.jwtConfig.secret,
      { algorithm: 'HS256', expiresIn: self.jwtConfig.expiresIn },
    );
  };

  verifyPassword = (passwordAttempt: string, hashedPassword: string) => {
    return bcrypt.compare(passwordAttempt, hashedPassword);
  };

  verifyToken = (token: string) => {
    const decodedToken = jwt.verify(token.slice(7), this.jwtConfig.secret, {
      algorithm: 'HS256',
      expiresIn: this.jwtConfig.expiresIn,
    });
    return decodedToken;
  };
}
