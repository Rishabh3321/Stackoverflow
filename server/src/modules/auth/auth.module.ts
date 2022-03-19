import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfig from 'src/config/db.config';
import jwtConfig from 'src/config/jwt.config';
import serverConfig from 'src/config/server.config';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serverConfig, jwtConfig, dbConfig],
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
