import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class RawQuestionDto {
  @ApiProperty()
  @MinLength(15)
  title: string;

  @ApiProperty()
  @MinLength(15)
  body: string;
}
