import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { AddCatDto } from './dto/add-cat';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCats() {
    return this.catsService.getAll();
  }

  @Get('learn')
  @Redirect('https://uk.wikipedia.org/wiki/Кіт', 301)
  //   TODO: don't understand func below
  learnAboutCats(): string {
    return 'Redirect to wiki';
  }

  @Get(':id')
  getCat(@Param('id') id: number) {
    return this.catsService.getOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addCat(@Body() addCatDto: AddCatDto) {
    return this.catsService.addCat(addCatDto);
  }
}
