import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from 'src/user/dto/new-user';
import { UserDetails } from 'src/user/user-details.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async register(
    user: Readonly<RegisterUserDto>,
  ): Promise<UserDetails | null | string> {
    const { name, email, password } = user;

    const existingUser = await this.userService.findOneByEmail(email);

    if (existingUser) {
      return 'User with this email already exists';
    }

    const hashPassword = await this.hashPassword(password);

    const newUser = await this.userService.create(name, email, hashPassword);

    return this.userService._getUserDetails(newUser);
  }
}
