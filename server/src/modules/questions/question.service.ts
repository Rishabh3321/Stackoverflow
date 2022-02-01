import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { PaginationQueryDto } from '../common/pagination-query.dto';
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

  async findAll(query: PaginationQueryDto): Promise<any[]> {
    const { limit, offset } = query;
    const questions = await this.question
      .find({})
      .skip(offset)
      .limit(limit)
      .exec();

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

  async upvote(id: string): Promise<QuestionDocument | HttpException> {
    const question = await this.question.findById(id).exec();
    const user = await this.user.findById(this.request.user.id).exec();

    const authors = question.versions.map((version) => version.user_id);
    if (authors.includes(this.request.user.id)) {
      return new HttpException("Authors can't upvote their own question", 403);
    }

    if (user.reputation < 15) {
      return new HttpException(
        'You need at least 15 reputation to upvote a question',
        403,
      );
    }
    const voteList = question.votes.map((vote) => vote.user_id);
    const index = voteList.indexOf(user.id);

    let authorReputationChange = 0;
    let userReputationChange = 0;

    if (index === -1) {
      question.votes.push({
        user_id: user.id,
        action: true,
      });
      authorReputationChange = 10;
    } else if (question.votes[index].action) {
      return new HttpException("You can't upvote twice", 403);
    } else {
      question.votes[index].action = true;
      userReputationChange = 1;
      authorReputationChange = 12;
    }

    authors.forEach(async (author) => {
      const authorUser = await this.user.findById(author).exec();
      authorUser.reputation += authorReputationChange;
      await authorUser.save();
    });
    user.reputation += userReputationChange;

    await user.save();
    return await question.save();
  }

  async downvote(id: string): Promise<QuestionDocument | HttpException> {
    const question = await this.question.findById(id).exec();
    const user = await this.user.findById(this.request.user.id).exec();

    const authors = question.versions.map((version) => version.user_id);
    if (authors.includes(this.request.user.id)) {
      return new HttpException(
        "Authors can't downvote their own question",
        403,
      );
    }

    if (user.reputation < 125) {
      return new HttpException('You need 125 reputation to downvote', 403);
    }

    const voteList = question.votes.map((vote) => vote.user_id);
    const index = voteList.indexOf(user.id);

    let authorReputationChange = 0;
    let userReputationChange = 0;

    if (index === -1) {
      question.votes.push({
        user_id: user.id,
        action: false,
      });

      userReputationChange = -1;
      authorReputationChange = -2;
    } else if (!question.votes[index].action) {
      return new HttpException("You can't downvote twice", 403);
    } else {
      question.votes[index].action = false;
      userReputationChange = -1;
      authorReputationChange = -12;
    }

    authors.forEach(async (author) => {
      const authorUser = await this.user.findById(author).exec();
      authorUser.reputation += authorReputationChange;
      await authorUser.save();
    });
    user.reputation += userReputationChange;

    await user.save();
    return await question.save();
  }
}
