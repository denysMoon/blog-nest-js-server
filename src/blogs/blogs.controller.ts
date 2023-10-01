import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { BlogService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog';
import { GetPostsByEmailDto } from './dto/get-posts-by-email';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  getFeed() {
    return this.blogService.getFeed();
  }

  @Post('create-post')
  @HttpCode(HttpStatus.CREATED)
  createBlog(@Body() createBlogDto: CreateBlogDto) {
    console.log(createBlogDto);
    return this.blogService.createPost(createBlogDto);
  }

  @Post('get-posts-by-email')
  @HttpCode(HttpStatus.CREATED)
  getPostsByEmail(@Body() getPostsByEmailDto: GetPostsByEmailDto) {
    return this.blogService.getPostsByEmail(getPostsByEmailDto);
  }
}
