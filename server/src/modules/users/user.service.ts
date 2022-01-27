import { HttpException, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword, verifyPassword } from 'src/utils/authentication';
import { LoginUserDto, RegisterUserDto } from './user.dto';
import { User, UserDocument } from './user.entity';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly user: Model<UserDocument>,
  ) {}

  getHello(userId: string): string {
    return `Hello World! ${userId}`;
  }

  async create(data: RegisterUserDto): Promise<UserDocument> {
    data.password = await hashPassword(data.password);
    let newUser = new this.user(data);
    try {
      newUser = await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      throw new HttpException('Error in saving user', 500);
    }
  }

  async login(data: LoginUserDto): Promise<UserDocument> {
    const userByEmail = await this.user.findOne({ email: data.email }).exec();
    if (!userByEmail) {
      throw new HttpException(`No user found with ${data.email}`, 409);
    }
    if (verifyPassword(data.password, userByEmail.password)) return userByEmail;
    else throw new HttpException(`Invalid Password`, 409);
  }
}
