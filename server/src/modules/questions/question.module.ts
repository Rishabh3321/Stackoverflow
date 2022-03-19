import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
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
    AuthModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionsModule {}
