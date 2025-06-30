import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferEntity } from './entities/offer.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../user/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Public()
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

  @Public()
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

  @Post('create')
  @UseGuards(RolesGuard)
  @Roles(Role.Seller, Role.Admin)
  @ApiOperation({ summary: 'Create  Offer' })
  @ApiBody({ type: CreateOfferDto, description: 'offer fields' })
  @ApiResponse({
    status: 200,
    description: 'Successfully created offer',
    type: OfferEntity,
  })
  async create(@Body() offer: CreateOfferDto): Promise<OfferEntity> {
    return await this.offerService.create(offer);
  }

  @Put('update/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Seller, Role.Admin)
  @ApiOperation({ summary: 'Update  Offer' })
  @ApiBody({ type: CreateOfferDto, description: 'offer fields' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated offer',
    type: OfferEntity,
  })
  async update(
    @Param('id') id: string,
    @Body() offer: CreateOfferDto,
  ): Promise<OfferEntity> {
    return await this.offerService.update(id, offer);
  }

  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Seller, Role.Admin)
  async delete(@Param('id') id: string): Promise<OfferEntity> {
    return await this.offerService.delete(id);
  }
}
