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
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @ApiOperation({ summary: 'Get all Offers' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get all offers',
    type: OfferEntity,
    isArray: true,
  })
  @Get('all')
  async findAll() {
    return await this.offerService.findAll();
  }

  @ApiParam({ name: 'id', type: 'string', description: 'id of offer' })
  @ApiOperation({ summary: 'Get  Offer by id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get  offer by id',
    type: OfferEntity,
  })
  @Get('find-by-id/:id')
  async findById(@Param('id') id: string) {
    return await this.offerService.findById(id);
  }

  @ApiOperation({ summary: 'Create  Offer' })
  @ApiBody({ type: CreateOfferDto, description: 'offer fields' })
  @ApiResponse({
    status: 200,
    description: 'Successfully created offer',
    type: OfferEntity,
  })
  @Post('create')
  async create(@Body() offer: CreateOfferDto): Promise<OfferEntity> {
    return await this.offerService.create(offer);
  }

  @ApiOperation({ summary: 'Update  Offer' })
  @ApiBody({ type: CreateOfferDto, description: 'offer fields' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated offer',
    type: OfferEntity,
  })
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
