import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Vote, VoteSchema } from '../votes/vote.entity';

@Schema()
class Version {
  @Prop()
  body: string;

  @Prop({ type: Types.ObjectId })
  user_id: string;
}

const VersionSchema = SchemaFactory.createForClass(Version);

@Schema()
export class Answer {
  @Prop({ _id: false, type: [VersionSchema] })
  versions: Version[];

  @Prop({ _id: false, type: [VoteSchema] })
  votes: Vote[];

  @Prop({ type: Types.ObjectId })
  question_id: Types.ObjectId;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);

AnswerSchema.method('toJSON', function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, votes, ...object } = this.toObject();

  object.id = _id;
  return object;
});

export type AnswerDocument = Answer & Document;
