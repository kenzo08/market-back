import { IsEnum } from 'class-validator';
import { OfferStatus } from '../enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOfferStatusDto {
  @ApiProperty({ enum: OfferStatus })
  @IsEnum(OfferStatus)
  status: OfferStatus;
}
