import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/user/dto/new-user';
import { UserDetails } from 'src/user/user-details.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body() user: RegisterUserDto,
  ): Promise<UserDetails | null | string> {
    return this.authService.register(user);
  }
}
