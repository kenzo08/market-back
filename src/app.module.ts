import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferModule } from './offer/offer.module';
import { CategoryModule } from './category/category.module';
import { ReviewModule } from './review/review.module';
import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    OfferModule,
    CategoryModule,
    ReviewModule,
  ],
})
export class AppModule {}
