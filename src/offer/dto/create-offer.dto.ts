import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOfferDto {
  @ApiProperty({
    example: 'iPhone 14 Pro',
    description: 'Название предложения',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Состояние нового, полный комплект. Пользовались 2 дня.',
    description: 'Описание предложения',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    description: 'Массив URL-адресов изображений',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiPropertyOptional({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'ID категории в формате UUID v4',
    format: 'uuid',
  })
  @IsUUID('4')
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({
    example: 'г. Москва, ул. Ленина, 1',
    description: 'Адрес филиала/точки',
  })
  @IsOptional()
  @IsString()
  branchAddress?: string;

  @ApiPropertyOptional({
    example: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
    description: 'ID автора/создателя оффера',
    format: 'uuid',
  })
  @IsUUID('4')
  @IsOptional()
  authorId?: string;
}
