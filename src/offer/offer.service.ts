import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { OfferEntity } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { CategoryEntity } from '../category/entities/category.entity';
import { OfferStatus } from './enums/status.enum';
import { Role } from '../user/enums/role.enum';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offerRepository: Repository<OfferEntity>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<OfferEntity[]> {
    return await this.offerRepository.find({
      order: { createdAt: 'desc' },
      relations: ['category', 'author'],
    });
  }

  async findById(id: string): Promise<OfferEntity> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!offer) throw new NotFoundException('Offer not found');

    const categoryRepo = this.dataSource.getTreeRepository(CategoryEntity);
    offer.category = await categoryRepo.findAncestorsTree(offer.category);

    return offer;
  }

  async create(offerDto: CreateOfferDto): Promise<OfferEntity> {
    if (!offerDto) throw new Error('Not provided data for new offer');

    const newOffer = this.offerRepository.create({
      title: offerDto.title,
      description: offerDto.description,
      images: offerDto.images,
      category_id: offerDto.categoryId,
      author: { id: Number(offerDto.authorId) },
      branchAddress: offerDto.branchAddress,
    });

    return await this.offerRepository.save(newOffer);
  }

  async update(id: string, offer: CreateOfferDto): Promise<OfferEntity> {
    const foundedOffer = await this.findById(id);
    Object.assign(foundedOffer, offer);

    return await this.offerRepository.save(foundedOffer);
  }

  async delete(id: string): Promise<OfferEntity> {
    const foundedOffer = await this.findById(id);
    return await this.offerRepository.remove(foundedOffer);
  }

  async updateStatus(
    id: string,
    status: OfferStatus,
    sellerId: number,
    role: Role,
  ): Promise<OfferEntity> {
    const offer = await this.findById(id);

    if (!offer) throw new NotFoundException('Торговое предложение не найдено');

    if (offer.author.id !== sellerId && role !== 'admin') {
      throw new ForbiddenException('Нет доступа');
    }

    if (status === OfferStatus.PUBLISHED && role !== 'admin') {
      throw new ForbiddenException('Нет прав для данной операций');
    }

    offer.status = status;
    return await this.offerRepository.save(offer);
  }
}
