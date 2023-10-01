import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ExistingUserDto } from 'src/user/dto/existing-user';
import { RegisterUserDto } from 'src/user/dto/new-user';
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

  async register(user: Readonly<RegisterUserDto>) {
    const { name, email, password } = user;

    const hashPassword = await this.hashPassword(password);

    const newUser = await this.userService.create({
      name,
      email,
      password: hashPassword,
    });

    return newUser;
  }

  async isPassportMath(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return 'This user does not exist';
    }

    const isPasswordMatch = await this.isPassportMath(password, user.password);

    if (!isPasswordMatch) {
      return 'Password is incorrect';
    }

    return user;
  }

  async login(existingUser: ExistingUserDto) {
    const { email, password } = existingUser;

    const user = await this.validateUser(email, password);

    if (
      user === 'This user does not exist' ||
      user === 'Password is incorrect'
    ) {
      return 'Something went wrong';
    }

    const jwt = await this.jwtService.signAsync({ user });

    return { token: jwt };
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp: exp };
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
