import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsController } from './infrastructure/controllers/bookings.controller';
import { IBookingsPortToken } from './application/ports/bookings.port';
import { BookingEntity } from './infrastructure/database/entities/booking.entity';
import { BookingsRepository } from './infrastructure/database/repositories/bookings.repository';
import { BookingsUsecases } from './application/usecases/bookings.usecase';
import { CarsModule } from './cars.module';
import { UsersModule } from './users.module';
import { SeasonsModule } from './seasons.module';

@Module({
  imports: [
    SeasonsModule,
    CarsModule,
    UsersModule,
    TypeOrmModule.forFeature([BookingEntity]),
  ],
  controllers: [BookingsController],
  providers: [
    BookingsUsecases,
    {
      provide: IBookingsPortToken,
      useClass: BookingsRepository,
    },
  ],
  exports: [IBookingsPortToken],
})
export class BookingsModule {}
