import { IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    example: 'Очень хорошее предложение!',
    description: 'Текст отзыва',
  })
  @IsString()
  text: string;

  @ApiProperty({
    example: 8.5,
    description: 'Оценка от 0 до 10',
    minimum: 0,
    maximum: 10,
  })
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @ApiProperty({
    example: 'd2a1a340-63e2-4d92-bf24-0d8c12bde0b4',
    description: 'ID предложения, к которому относится отзыв',
  })
  @IsUUID('4')
  offerId: string;
}
