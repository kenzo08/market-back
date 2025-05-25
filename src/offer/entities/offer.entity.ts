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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 120,
  })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column('text', { array: true, nullable: true })
  images?: string[];

  @OneToMany(() => ReviewEntity, (review) => review.offer)
  reviews: ReviewEntity[];

  @Column({ type: 'uuid' })
  category_id: string;

  @ManyToOne(() => CategoryEntity, (category) => category.offers, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
