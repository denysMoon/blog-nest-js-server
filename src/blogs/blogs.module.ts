import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blogs.controller';
import { BlogService } from './blogs.service';
import { Blog, BlogSchema } from 'src/schemas/blog.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: Blog.name,
        schema: BlogSchema,
      },
    ]),
  ],
})
export class BlogModule {}
