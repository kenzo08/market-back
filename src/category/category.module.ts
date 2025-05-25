import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { OfferEntity } from '../offer/entities/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, OfferEntity])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
