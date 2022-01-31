import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Vote {
  @Prop({ type: Types.ObjectId })
  user_id: string;

  @Prop({ type: Boolean })
  action: boolean;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
