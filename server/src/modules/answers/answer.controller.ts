import { Controller, Get, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { Answer, AnswerDocument } from './answer.entity';
import { AnswerService } from './answer.service';

@Controller('/answer')
export class AnswerController {
  constructor(
    private answerService: AnswerService,
    private authService: AuthService,
    @InjectModel(Answer.name) private readonly user: Model<AnswerDocument>,
  ) {}

  @Get('')
  async findAll() {
    return await this.answerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.answerService.findOne(id);
  }
}
