import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../user/enums/role.enum';
import { GetCurrentUserId } from '../auth/decorators/get-current-user-id.decorator';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { CreateBookingDto } from './dto/create-booking.dto';

@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('create')
  @Roles(Role.User)
  async createBooking(
    @Body() dto: CreateBookingDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.bookingService.createBooking(dto, userId);
  }

  @Get('offer/:offerId')
  @Roles(Role.Seller, Role.Admin)
  async getBookingsByOffer(
    @Param('offerId') offerId: string,
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('role') role: Role,
  ) {
    return this.bookingService.getBookingsByOffer(offerId, userId, role);
  }

  @Get('my')
  @Roles(Role.User)
  async getBookingsByUser(@GetCurrentUserId() userId: number) {
    return this.bookingService.getBookingsByUser(userId);
  }

  @Put('confirm/:bookingId')
  @Roles(Role.Seller)
  async confirmBooking(
    @Param('bookingId') bookingId: string,
    @GetCurrentUserId() sellerId: number,
  ) {
    return this.bookingService.confirmBooking(bookingId, sellerId);
  }

  @Put('cancel/:bookingId')
  @Roles(Role.User, Role.Admin)
  async cancelBooking(
    @Param('bookingId') bookingId: string,
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('role') role: Role,
  ) {
    return this.bookingService.cancelBooking(bookingId, userId, role);
  }

  @Put('complete/:bookingId')
  @Roles(Role.Seller)
  async completeBookingByCode(
    @Param('bookingId') bookingId: string,
    @Body('code') code: string,
    @GetCurrentUserId() sellerId: number,
  ) {
    return this.bookingService.completeBookingByCode(bookingId, code, sellerId);
  }
}
