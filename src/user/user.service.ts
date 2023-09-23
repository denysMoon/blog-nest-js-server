import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { UserDetails } from './user-details.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      email: user.email,
      name: user.name,
    };
  }

  async create(
    name: string,
    email: string,
    hashPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashPassword,
    });
    return newUser.save();
  }

  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOneById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById({ id }).exec();

    if (!user) {
      return null;
    }

    return this._getUserDetails(user);
  }

  async getAllUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
}
