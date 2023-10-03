import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateThemeModeDto } from './dto/update-theme-mode';

@Injectable()
export class UserSettingsService {
  constructor(private prisma: PrismaService) {}

  async getUserSettings(id: string) {
    return this.prisma.userSetting.findMany({
      where: {
        id: Number(id),
      },
    });
  }

  async createSettingsTable(userId: number) {
    const createdUserSetting = await this.prisma.userSetting.create({
      data: {
        id: userId,
        userSettingId: userId,
      },
    });

    // TODO: Add error handling

    return createdUserSetting;
  }

  async updateThemeMode(updateThemeModeDto: UpdateThemeModeDto) {
    const { userId, themeMode } = updateThemeModeDto;

    const userSetting = await this.prisma.userSetting.findUnique({
      where: { id: userId },
    });

    if (!userSetting) {
      await this.createSettingsTable(userId);
    }

    const updatedUserSetting = await this.prisma.userSetting.update({
      where: { id: userId },
      data: { themeMode },
    });

    return updatedUserSetting.themeMode;
  }
}
