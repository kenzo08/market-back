import { Injectable } from '@nestjs/common';
import { ReviewEntity } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { OfferService } from '../offer/offer.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly offerService: OfferService,
  ) {}

  async create(review: CreateReviewDto): Promise<ReviewEntity> {
    const { text, rating, offerId } = review;
    const offer = await this.offerService.findById(offerId);
    const createReview = this.reviewRepository.create({
      text,
      rating,
      offer,
    });

    return await this.reviewRepository.save(createReview);
  }

  async getOfferReviews(offerId: string): Promise<ReviewEntity[]> {
    return await this.reviewRepository.find({
      where: { offerId: offerId },
    });
  }
}
