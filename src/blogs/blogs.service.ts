import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateBlogDto } from './dto/create-blog';

@Injectable()
export class BlogService {
  constructor(private userService: UserService) {}

  async getBlog() {
    // return this.blogModel.find().exec();
  }

  async createBlog(createBlogDto: CreateBlogDto) {
    const { email, title } = createBlogDto;
    console.log(email, title);

    return 'createdBlog';
  }
}
