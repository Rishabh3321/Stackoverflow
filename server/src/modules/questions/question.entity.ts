import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Vote, VoteSchema } from '../votes/vote.entity';

@Schema()
export class Version {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop({ type: Types.ObjectId })
  user_id: string;
}

export const VersionSchema = SchemaFactory.createForClass(Version);

@Schema()
export class Question {
  @Prop({ _id: false, type: [VersionSchema] })
  versions: Version[];

  @Prop({ _id: false, type: [VoteSchema] })
  votes: Vote[];
  @Prop({ default: 1 })
  views: number;

  @Prop({ type: [Types.ObjectId] })
  answers: Types.ObjectId[];

  @Prop({ type: Types.ObjectId })
  accepted_answer_id: Types.ObjectId;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

QuestionSchema.method('toJSON', function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, votes, ...object } = this.toObject();

  object.id = _id;
  return object;
});

export type QuestionDocument = Question & Document;
