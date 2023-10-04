import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { UpdateThemeModeDto } from './dto/update-theme-mode';

@Controller('user-settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Get(':id')
  getUserSettings(@Param('id') id: string) {
    return this.userSettingsService.getUserSettings(id);
  }

  @Patch('theme-mode')
  updateThemeMode(@Body() updateThemeModeDto: UpdateThemeModeDto) {
    return this.userSettingsService.updateThemeMode(updateThemeModeDto);
  }
}
