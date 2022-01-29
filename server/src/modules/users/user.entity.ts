import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: 1 })
  reputation: number;

  @Prop({ type: [Types.ObjectId] })
  questions: [Types.ObjectId];

  @Prop({ type: [Types.ObjectId] })
  answers: [Types.ObjectId];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.method('toJSON', function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export type userDocument = User & Document;
