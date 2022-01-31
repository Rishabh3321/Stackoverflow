import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { Answer, AnswerDocument } from './answer.entity';

@Injectable({ scope: Scope.REQUEST })
export class AnswerService {
  constructor(
    @InjectModel(Answer.name)
    private readonly answer: Model<AnswerDocument>,
    private authService: AuthService,
  ) {}

  async findAll(): Promise<AnswerDocument[]> {
    return await this.answer.find({}).exec();
  }

  async findOne(id: string): Promise<AnswerDocument> {
    return await this.answer.findById(id).exec();
  }
}
