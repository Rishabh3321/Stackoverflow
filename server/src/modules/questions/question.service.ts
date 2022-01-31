import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { User, UserDocument } from '../users/user.entity';
import { RawQuestionDto } from './question.dto';
import { Question, QuestionDocument } from './question.entity';

@Injectable({ scope: Scope.REQUEST })
export class QuestionService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request & { user: { id: string } },
    @InjectModel(Question.name)
    private readonly question: Model<QuestionDocument>,
    @InjectModel(User.name)
    private readonly user: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  async findAll(): Promise<any[]> {
    const questions = await this.question.find({}).exec();

    const questionsWithUserInfo = await Promise.all(
      questions.map(async (question) => {
        const questionsWithUserInfo: any = question.toObject();

        questionsWithUserInfo.versions = await Promise.all(
          question.versions.map(async (version) => {
            const extraInfo: {
              name: string;
              email: string;
              reputation: number;
            } = await this.user
              .findById(version.user_id, 'name email reputation')
              .exec();

            const versionWithUserInfo: {
              user_id: string;
              title: string;
              body: string;
              name: string;
              email: string;
              reputation: number;
            } = {
              user_id: version.user_id,
              title: version.title,
              body: version.body,
              name: extraInfo.name,
              email: extraInfo.email,
              reputation: extraInfo.reputation,
            };
            return versionWithUserInfo;
          }),
        );
        return questionsWithUserInfo;
      }),
    );
    return questionsWithUserInfo;
  }

  async findOne(id: string): Promise<QuestionDocument> {
    return await this.question.findById(id).exec();
  }

  async create(data: RawQuestionDto): Promise<QuestionDocument> {
    const genesisVersion = [
      {
        title: data.title,
        body: data.body,
        user_id: this.request.user.id,
      },
    ];

    const question = new this.question();
    question.versions = genesisVersion;

    const user = await this.user.findById(this.request.user.id).exec();
    user.questions.push(question._id);

    await user.save();
    return await question.save();
  }
}
