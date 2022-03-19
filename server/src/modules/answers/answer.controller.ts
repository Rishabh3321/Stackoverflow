import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { AuthGuard } from 'src/guards/auth.guard';
import { RawAnswerDto } from './answer.dto';
import { Answer, AnswerDocument } from './answer.entity';
import { AnswerService } from './answer.service';

@Controller('/answer')
export class AnswerController {
  constructor(
    private answerService: AnswerService,
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/create')
  async create(@Body() data: RawAnswerDto) {
    return await this.answerService.create(data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/:id/upvote')
  async upvote(@Param('id') id: string) {
    return await this.answerService.upvote(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/:id/downvote')
  async downvote(@Param('id') id: string) {
    return await this.answerService.downvote(id);
  }
}
