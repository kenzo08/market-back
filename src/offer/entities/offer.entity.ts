import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReviewEntity } from '../../review/entities/review.entity';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity({ name: 'offers' })
export class OfferEntity {
  @ApiProperty({ example: 'f3d87fc5-9dcf-489f-aaf7-1ddf9c1e28b1' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'iPhone 14 Pro' })
  @Column({ nullable: false, type: 'varchar', length: 120 })
  title: string;

  @ApiProperty({ example: 'Новый, оригинал, в упаковке.' })
  @Column({ type: 'text' })
  description: string;

  @ApiPropertyOptional({
    example: ['https://example.com/img1.jpg'],
    type: [String],
  })
  @Column('text', { array: true, nullable: true })
  images?: string[];

  @ApiPropertyOptional({ type: () => [ReviewEntity] })
  @OneToMany(() => ReviewEntity, (review) => review.offer)
  reviews: ReviewEntity[];

  @ApiPropertyOptional({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'ID категории',
  })
  @Column({ type: 'uuid', nullable: true })
  category_id: string;

  @ApiPropertyOptional({ type: () => CategoryEntity })
  @ManyToOne(() => CategoryEntity, (category) => category.offers, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ApiProperty({ example: '2025-06-13T15:30:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2025-06-13T15:30:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
