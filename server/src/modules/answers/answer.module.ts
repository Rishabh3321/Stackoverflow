import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Question, QuestionSchema } from '../questions/question.entity';
import { User, UserSchema } from '../users/user.entity';
import { AnswerController } from './answer.controller';
import { Answer, AnswerSchema } from './answer.entity';
import { AnswerService } from './answer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Answer.name, schema: AnswerSchema },
      { name: Question.name, schema: QuestionSchema },
      { name: User.name, schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
