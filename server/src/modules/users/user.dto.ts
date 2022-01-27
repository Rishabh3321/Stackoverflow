import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, MaxLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}

export class RegisterUserDto extends LoginUserDto {
  @ApiProperty()
  @MaxLength(15)
  username: string;

  @ApiProperty()
  name: string;
}
