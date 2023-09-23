import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatsDocument = Cats & Document;

@Schema()
export class Cats {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  color: string;
}

export const CatsSchema = SchemaFactory.createForClass(Cats);
