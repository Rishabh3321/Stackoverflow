import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  HttpException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request as req } from 'express';
import { Model } from 'mongoose';
import { AuthGuard } from 'src/guards/auth.guard';
import { createToken } from 'src/utils/authentication';
import { LoginUserDto, RegisterUserDto } from './user.dto';
import { User, UserDocument } from './user.entity';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private userService: UserService,
    @InjectModel(User.name) private readonly user: Model<UserDocument>,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  getHello(@Request() req: req): string {
    return this.userService.getHello(req['user-id']);
  }

  @Post('/register')
  async register(@Body() data: RegisterUserDto) {
    const userByEmail = await this.user.findOne({ email: data.email }).exec();
    const userByUsername = await this.user
      .findOne({ username: data.username })
      .exec();

    if (userByEmail) {
      throw new HttpException(
        `User already registered with ${data.email}`,
        409,
      );
    }
    if (userByUsername) {
      throw new HttpException(
        `User already registered with ${data.username}`,
        409,
      );
    }
    const newUser = await this.userService.create(data);
    const token = createToken(newUser);

    return {
      message: 'Registration Successful',
      details: newUser,
      token,
    };
  }

  @Post('/login')
  async login(@Body() data: LoginUserDto) {
    const user = await this.userService.login(data);
    const token = createToken(user);
    return {
      message: 'Login Successful',
      details: user,
      token,
    };
  }
}
