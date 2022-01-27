import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import jwtConfig from 'src/config/jwt.config';
import serverConfig from 'src/config/server.config';
import { AuthService } from '../auth/auth.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serverConfig, jwtConfig],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UsersModule {}
