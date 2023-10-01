import { Module } from '@nestjs/common';
import { BlogController } from './blogs.controller';
import { BlogService } from './blogs.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [UserModule],
})
export class BlogModule {}
