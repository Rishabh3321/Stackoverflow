import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { Question, QuestionDocument } from '../questions/question.entity';
import { User, UserDocument } from '../users/user.entity';
import { RawAnswerDto } from './answer.dto';
import { Answer, AnswerDocument } from './answer.entity';

@Injectable({ scope: Scope.REQUEST })
export class AnswerService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request & { user: { id: string } },
    @InjectModel(Answer.name)
    private readonly answer: Model<AnswerDocument>,
    @InjectModel(Question.name)
    private readonly question: Model<QuestionDocument>,
    @InjectModel(User.name)
    private readonly user: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  async findAll(): Promise<AnswerDocument[]> {
    return await this.answer.find({}).exec();
  }

  async findOne(id: string): Promise<AnswerDocument> {
    return await this.answer.findById(id).exec();
  }

  async create(data: RawAnswerDto): Promise<AnswerDocument | HttpException> {
    const question = await this.question.findById(data.question_id).exec();
    if (!question) {
      throw new HttpException('Question not found', 404);
    }

    const user = await this.user.findById(this.request.user.id).exec();
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    let answer = new this.answer({
      versions: [
        {
          user_id: this.request.user.id,
          body: data.body,
        },
      ],
      question_id: data.question_id,
    });
    answer = await answer.save();

    question.answers.push(answer._id);
    user.answers.push(answer._id);
    await question.save();
    await user.save();
    return answer;
  }

  async upvote(id: string): Promise<AnswerDocument | HttpException> {
    const answer = await this.answer.findById(id).exec();
    const user = await this.user.findById(this.request.user.id).exec();

    const authors = answer.versions.map((version) => version.user_id);
    if (authors.includes(this.request.user.id)) {
      return new HttpException("Authors can't upvote their own answer", 403);
    }

    if (user.reputation < 15) {
      return new HttpException(
        'You need at least 15 reputation to upvote a answer',
        403,
      );
    }
    const voteList = answer.votes.map((vote) => vote.user_id);
    const index = voteList.indexOf(user.id);

    let authorReputationChange = 0;
    let userReputationChange = 0;

    if (index === -1) {
      answer.votes.push({
        user_id: user.id,
        action: true,
      });
      authorReputationChange = 10;
    } else if (answer.votes[index].action) {
      return new HttpException("You can't upvote twice", 403);
    } else {
      answer.votes[index].action = true;
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
    return await answer.save();
  }

  async downvote(id: string): Promise<AnswerDocument | HttpException> {
    const answer = await this.answer.findById(id).exec();
    const user = await this.user.findById(this.request.user.id).exec();

    const authors = answer.versions.map((version) => version.user_id);
    if (authors.includes(this.request.user.id)) {
      return new HttpException("Authors can't downvote their own answer", 403);
    }

    if (user.reputation < 125) {
      return new HttpException('You need 125 reputation to downvote', 403);
    }

    const voteList = answer.votes.map((vote) => vote.user_id);
    const index = voteList.indexOf(user.id);

    let authorReputationChange = 0;
    let userReputationChange = 0;

    if (index === -1) {
      answer.votes.push({
        user_id: user.id,
        action: false,
      });

      userReputationChange = -1;
      authorReputationChange = -2;
    } else if (!answer.votes[index].action) {
      return new HttpException("You can't downvote twice", 403);
    } else {
      answer.votes[index].action = false;
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
    return await answer.save();
  }
}
