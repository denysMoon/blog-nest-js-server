import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { JwtGuard } from 'src/auth/guard/jws.guard';
import { CreateBlogDto } from './dto/add-post';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBlog(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.createBlog(createBlogDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  getBlog() {
    return this.blogService.getBlog();
  }
}
