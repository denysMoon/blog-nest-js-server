import { Injectable } from '@nestjs/common';
import { AddCatDto } from './dto/add-cat';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CatsService {
  private cats = [
    {
      name: 'Car',
      color: 'black',
      id: uuidv4(),
    },
    {
      name: 'Dander',
      color: 'black and white',
      id: uuidv4(),
    },
    {
      name: 'Mur',
      color: 'white',
      id: uuidv4(),
    },
  ];

  getAll() {
    return this.cats;
  }

  getOne(id: number) {
    return this.cats.find((cat) => cat.id === id);
  }

  addCat(addCatDto: AddCatDto) {
    this.cats.push({
      ...addCatDto,
      id: uuidv4(),
    });
  }
}
