import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from 'src/config/db.config';
import jwtConfig from 'src/config/jwt.config';
import serverConfig from 'src/config/server.config';
import { AuthService } from '../auth/auth.service';
import { UsersModule } from '../users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serverConfig, jwtConfig],
    }),
    MongooseModule.forRoot(dbConfig.uri),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
