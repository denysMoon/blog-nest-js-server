import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogDocument } from 'src/schemas/blog.schema';
import { CreateBlogDto } from './dto/add-post';
// import { AddPostDto } from './dto/add-post';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Blog') private blogModel: Model<BlogDocument>) {}

  async getBlog(): Promise<BlogDocument[]> {
    return this.blogModel.find().exec();
  }

  async createBlog(createBlogDto: CreateBlogDto) {
    console.log(createBlogDto);
  }
}
