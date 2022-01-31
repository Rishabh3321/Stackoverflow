import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { User, UserSchema } from '../users/user.entity';
import { QuestionController } from './question.controller';
import { Question, QuestionSchema } from './question.entity';
import { QuestionService } from './question.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService, AuthService],
})
export class QuestionsModule {}
