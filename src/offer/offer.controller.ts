import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferEntity } from './entities/offer.entity';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get('all')
  async findAll() {
    return await this.offerService.findAll();
  }

  @Get('find-by-id/:id')
  async findById(@Param('id') id: string) {
    return await this.offerService.findById(id);
  }

  @Post('create')
  async create(@Body() offer: CreateOfferDto): Promise<OfferEntity> {
    return await this.offerService.create(offer);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() offer: CreateOfferDto,
  ): Promise<OfferEntity> {
    return await this.offerService.update(id, offer);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<OfferEntity> {
    return await this.offerService.delete(id);
  }
}
