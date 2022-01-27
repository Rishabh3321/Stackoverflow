import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from 'src/config/db.config';
import { UsersModule } from '../users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot(dbConfig.uri), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
