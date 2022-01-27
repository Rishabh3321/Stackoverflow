import { IsEmail, MinLength, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @MinLength(5)
  @MaxLength(20)
  password: string;
}

export class RegisterUserDto extends LoginUserDto {
  @MaxLength(15)
  username: string;
  name: string;
}
