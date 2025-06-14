import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewEntity } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Отзывы')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('get-offer-reviews/:id')
  @ApiOperation({ summary: 'Получить отзывы по ID предложения' })
  @ApiParam({
    name: 'id',
    description: 'ID предложения',
    example: 'd2a1a340-63e2-4d92-bf24-0d8c12bde0b4',
  })
  @ApiResponse({
    status: 200,
    description: 'Список отзывов по предложению',
    type: ReviewEntity,
    isArray: true,
  })
  async getOfferReviews(@Param('id') id: string): Promise<ReviewEntity[]> {
    return await this.reviewService.getOfferReviews(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Создать отзыв' })
  @ApiBody({
    type: CreateReviewDto,
    description: 'Поля для создания отзыва',
  })
  @ApiResponse({
    status: 201,
    description: 'Отзыв успешно создан',
    type: ReviewEntity,
  })
  async create(@Body() review: CreateReviewDto): Promise<ReviewEntity> {
    return await this.reviewService.create(review);
  }
}
