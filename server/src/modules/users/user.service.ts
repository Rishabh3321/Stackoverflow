import { HttpException, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto, RegisterUserDto } from './user.dto';
import { User, UserDocument } from './user.entity';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly user: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  async create(data: RegisterUserDto): Promise<UserDocument> {
    data.password = await this.authService.hashPassword(data.password);
    let newUser = new this.user(data);
    try {
      newUser = await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      throw new HttpException('Error in saving user', 500);
    }
  }

  async login(data: LoginUserDto): Promise<UserDocument | HttpException> {
    const userByEmail = await this.user.findOne({ email: data.email }).exec();
    if (!userByEmail) {
      throw new HttpException(`No user found with ${data.email}`, 409);
    }
    const isPasswordValid = await this.authService.verifyPassword(
      data.password,
      userByEmail.password,
    );
    if (isPasswordValid) return userByEmail;
    else throw new HttpException(`Invalid Password`, 409);
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.user
      .find({}, 'name email id createdAt reputation')
      .exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    return await this.user.findById(id).exec();
  }
}
