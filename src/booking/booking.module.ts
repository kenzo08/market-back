import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './entities/booking.entity';
import { OfferEntity } from '../offer/entities/offer.entity';
import { User } from '../user/entities/user.entity';

export * from './entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity, OfferEntity, User])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
