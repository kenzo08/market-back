import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferEntity } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offerRepository: Repository<OfferEntity>,
  ) {}

  async findAll(): Promise<OfferEntity[]> {
    return await this.offerRepository.find({
      order: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<OfferEntity> {
    const foundedOffer = await this.offerRepository.findOne({
      where: { id: id },
    });

    if (!foundedOffer) throw new NotFoundException('Offer not found');

    return foundedOffer;
  }

  async create(offerDto: CreateOfferDto): Promise<OfferEntity> {
    if (!offerDto) throw new Error('Not provided data for new offer');

    const newOffer = this.offerRepository.create({
      title: offerDto.title,
      description: offerDto.description,
      images: offerDto.images,
      category_id: offerDto.categoryId,
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
}
