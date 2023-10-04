import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateThemeModeDto } from './dto/update-theme-mode';

@Injectable()
export class UserSettingsService {
  constructor(private prisma: PrismaService) {}

  // Temporary solution to get only themeMode
  async getUserSettings(id: string) {
    return await this.prisma.userSetting.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        themeMode: true,
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

    // Temporary solution to update only themeMode
    const updatedUserSetting = await this.prisma.userSetting.update({
      where: { id: userId },
      data: { themeMode },
      select: {
        themeMode: true,
      },
    });

    return updatedUserSetting;
  }
}
