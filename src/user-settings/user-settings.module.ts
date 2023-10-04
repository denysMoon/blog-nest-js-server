import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserSettingsController } from './user-settings.controller';
import { UserSettingsService } from './user-settings.service';

@Module({
  controllers: [UserSettingsController],
  providers: [PrismaService, UserSettingsService],
  imports: [],
})
export class SettingsModule {}
