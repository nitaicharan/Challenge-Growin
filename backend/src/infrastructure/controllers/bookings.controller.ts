import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { BookingsUsecases } from 'src/application/usecases/bookings.usecase';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingModel } from 'src/domain/models/booking.model';

@Controller('/bookings')
export class BookingsController {
  constructor(private readonly usecase: BookingsUsecases) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.usecase.create({
      ...dto,
      car: { id: dto.carId },
      user: { id: dto.userId },
    } as unknown as BookingModel);
  }

  @Get('dashboard')
  profile(@Request() request: Record<string, string>): Promise<BookingModel[]> {
    return this.usecase.dashboard(request);
  }
}
