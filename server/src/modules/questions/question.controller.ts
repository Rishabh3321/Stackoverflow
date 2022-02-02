import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from '../auth/auth.service';
import { PaginationQueryDto } from '../common/pagination-query.dto';
import { RawQuestionDto } from './question.dto';
import { Question, QuestionDocument } from './question.entity';
import { QuestionService } from './question.service';

@Controller('/question')
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private authService: AuthService,
    @InjectModel(Question.name) private readonly user: Model<QuestionDocument>,
  ) {}

  @Get('')
  async findAll(@Query() query: PaginationQueryDto) {
    return await this.questionService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.questionService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/create')
  async create(@Body() data: RawQuestionDto) {
    return await this.questionService.create(data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/:id/upvote')
  async vote(@Param('id') id: string) {
    return await this.questionService.upvote(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/:id/downvote')
  async downvote(@Param('id') id: string) {
    return await this.questionService.downvote(id);
  }

  @Put(':id/view')
  async view(@Param('id') id: string) {
    return await this.questionService.viewed(id);
  }
}
