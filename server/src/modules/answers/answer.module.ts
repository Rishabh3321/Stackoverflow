import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { AnswerController } from './answer.controller';
import { Answer, AnswerSchema } from './answer.entity';
import { AnswerService } from './answer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
  ],
  controllers: [AnswerController],
  providers: [AnswerService, AuthService],
})
export class AnswerModule {}
