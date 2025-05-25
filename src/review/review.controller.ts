import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewEntity } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('get-offer-reviews/:id')
  async getOfferReviews(@Param('id') id: string): Promise<ReviewEntity[]> {
    return await this.reviewService.getOfferReviews(id);
  }

  @Post('create')
  async create(@Body() review: CreateReviewDto): Promise<ReviewEntity> {
    return await this.reviewService.create(review);
  }
}
