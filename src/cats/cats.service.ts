import { Injectable } from '@nestjs/common';
import { AddCatDto } from './dto/add-cat';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CatsDocument } from 'src/schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cats') private catsModel: Model<CatsDocument>) {}

  async getAll(): Promise<CatsDocument[]> {
    return this.catsModel.find().exec();
  }

  async addCat(addCatDto: AddCatDto): Promise<CatsDocument> {
    const newCat = new this.catsModel(addCatDto);
    return newCat.save();
  }
}
