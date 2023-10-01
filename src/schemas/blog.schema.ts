import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  email: string;

  @Prop([
    {
      title: String,
      post: String,
    },
  ])
  posts: { title: string; post: string }[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
