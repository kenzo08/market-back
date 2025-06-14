import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Смартфоны',
    description: 'Название категории',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'Категория для всех видов смартфонов',
    description: 'Описание категории (необязательно)',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: '8e7f20c1-3fbd-4c19-a3d9-d88c8c5a5e1e',
    description: 'ID родительской категории (если это подкатегория)',
  })
  @IsUUID('4')
  @IsOptional()
  parentId?: string;
}
