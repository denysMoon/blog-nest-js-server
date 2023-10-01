import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async getFeed() {
    return this.prisma.post.findMany({});
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async getPostsByEmail(getPostsByEmailDto): Promise<Post[]> {
    const { email } = getPostsByEmailDto;

    return this.prisma.post.findMany({
      where: {
        author: {
          email,
        },
      },
    });
  }
}
