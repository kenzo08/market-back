import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { OfferService } from '../offer/offer.service';
import { OfferEntity } from '../offer/entities/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, OfferEntity])],
  controllers: [ReviewController],
  providers: [ReviewService, OfferService],
})
export class ReviewModule {}
