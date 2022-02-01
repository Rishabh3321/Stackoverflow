import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, MinLength } from 'class-validator';

export class RawAnswerDto {
  @ApiProperty()
  @MinLength(1)
  body: string;

  @ApiProperty()
  @IsMongoId()
  question_id: string;
}
