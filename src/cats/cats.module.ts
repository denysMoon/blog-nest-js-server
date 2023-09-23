import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cats, CatsSchema } from 'src/schemas/cat.schema';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Cats.name,
        schema: CatsSchema,
      },
    ]),
  ],
})
export class CatsModule {}
