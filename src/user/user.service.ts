import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ email, name, password }: Prisma.UserCreateInput) {
    const isUserExist = await this.findOneByEmail(email);

    if (isUserExist) {
      return 'User exist';
    }

    const newUser = await this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    return newUser;
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
