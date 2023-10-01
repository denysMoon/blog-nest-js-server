import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserModule, PrismaService],

  exports: [UserService],
})
export class UserModule {}
