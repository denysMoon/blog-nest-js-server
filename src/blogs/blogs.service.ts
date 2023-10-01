import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogDocument } from 'src/schemas/blog.schema';
import { UserService } from 'src/user/user.service';
import { CreateBlogDto } from './dto/create-blog';
import { AddPostDto } from './dto/add-post';
// import { AddPostDto } from './dto/add-post';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('Blog') private blogModel: Model<BlogDocument>,
    private userService: UserService,
  ) {}

  async getBlog(): Promise<BlogDocument[]> {
    return this.blogModel.find().exec();
  }

  async createBlog(createBlogDto: CreateBlogDto) {
    const { email, title } = createBlogDto;
    console.log(email, title);

    const blog = await this.blogModel.create({
      email,
      title,
      posts: [],
    });

    console.log(blog);

    return 'createdBlog';
  }

  async addPost(addPostDto: AddPostDto) {
    const { email, title, post } = addPostDto;

    console.log(addPostDto);
    const blog = await this.blogModel.findOne({ email });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    blog.posts.push({ title, post });

    const updatedBlog = await blog.save();

    return updatedBlog;
  }
}
