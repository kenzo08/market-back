import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OfferEntity } from '../../offer/entities/offer.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'reviews' })
export class ReviewEntity {
  @ApiProperty({
    example: 'b59b1df2-e14a-4c8b-b5b1-8f5eabea0f83',
    description: 'ID отзыва',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Отличное предложение!',
    description: 'Текст отзыва',
  })
  @Column({ type: 'text' })
  text: string;

  @ApiProperty({ example: 8.5, description: 'Оценка от 0 до 10' })
  @Column({ type: 'decimal', precision: 3, scale: 1, default: '0.0' })
  rating: number;

  @ApiProperty({
    example: 'a3f6d510-9230-4c62-b5f6-8ccf962feacf',
    description: 'ID предложения',
  })
  @Column({ name: 'offer_id', type: 'uuid' })
  offerId: string;

  @ManyToOne(() => OfferEntity, (offer) => offer.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'offer_id' })
  offer: OfferEntity;

  @ApiProperty({
    example: '2024-06-13T12:00:00Z',
    description: 'Дата создания',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2024-06-13T12:10:00Z',
    description: 'Дата обновления',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
