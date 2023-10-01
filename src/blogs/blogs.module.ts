import { Module } from '@nestjs/common';
import { BlogController } from './blogs.controller';
import { BlogService } from './blogs.service';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService, PrismaService],
  imports: [UserModule],
})
export class BlogModule {}
