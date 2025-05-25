import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Tree,
  TreeChildren,
  TreeParent,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OfferEntity } from '../../offer/entities/offer.entity';

@Entity({ name: 'categories' })
@Tree('materialized-path')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @TreeParent()
  parent: CategoryEntity;

  @Column({ nullable: true })
  parentId?: string;

  @TreeChildren({ cascade: true })
  children: CategoryEntity[];

  @OneToMany(() => OfferEntity, (offer) => offer.category)
  offers: OfferEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
