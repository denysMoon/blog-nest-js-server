import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ExistingUserDto } from 'src/user/dto/existing-user';
import { RegisterUserDto } from 'src/user/dto/new-user';
import { UserDetails } from 'src/user/user-details.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

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

  async isPassportMath(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | string> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return 'This user does not exist';
    }

    const isPasswordMatch = await this.isPassportMath(password, user.password);

    if (!isPasswordMatch) {
      return 'Password is incorrect';
    }

    return this.userService._getUserDetails(user);
  }

  async login(
    existingUser: ExistingUserDto,
  ): Promise<{ token: string } | null> {
    const { email, password } = existingUser;

    const user = await this.validateUser(email, password);

    if (
      user === 'This user does not exist' ||
      user === 'Password is incorrect'
    ) {
      return null;
    }

    const jwt = await this.jwtService.signAsync({ user });

    return { token: jwt };
  }
}
