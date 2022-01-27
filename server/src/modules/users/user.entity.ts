import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
// export const Userschema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   username: { type: String, unique: true },
//   role: { type: String, default: 'user' },
//   reputation: { type: Number, default: 1 },
//   questions: [{ type: mongoose.Schema.Types.ObjectId }],
//   answers: [{ type: mongoose.Schema.Types.ObjectId }],
//   created_at: { type: Date, default: Date.now },
//   updated_at: { type: Date, default: Date.now },
// });

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String, unique: true })
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.method('toJSON', function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export type userDocument = User & Document;
