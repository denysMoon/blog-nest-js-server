import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/user/dto/new-user';
import { UserDetails } from 'src/user/user-details.interface';
import { ExistingUserDto } from 'src/user/dto/existing-user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body() user: RegisterUserDto,
  ): Promise<UserDetails | null | string> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: ExistingUserDto): Promise<{ token: string } | string> {
    return this.authService.login(user);
  }
}
