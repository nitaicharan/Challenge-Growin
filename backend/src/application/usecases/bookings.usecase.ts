import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IBookingsPort, IBookingsPortToken } from '../ports/bookings.port';
import { BookingModel } from 'src/domain/models/booking.model';
import { CarsUsecases } from './cars.usecases';
import { UsersUsecases } from './users.usecase';
import { CarModel } from 'src/domain/models/car.model';
import { SeasonsUsecases } from './seasons.usecase';

@Injectable()
export class BookingsUsecases {
  constructor(
    @Inject(IBookingsPortToken)
    private readonly port: IBookingsPort,
    private readonly carsUsecases: CarsUsecases,
    private readonly usersUsecase: UsersUsecases,
    private readonly seasonUsecase: SeasonsUsecases,
  ) {}

  async create(model: BookingModel) {
    const user = await this.usersUsecase.get(model.user.id);
    const car = await this.carsUsecases.get(model.car.id);

    if (!user || !car) {
      throw new BadRequestException('User or car not found');
    }

    if (user.licenseValidUntil < model.endDate) {
      throw new BadRequestException(
        'Driving license must be valid through all booking period',
      );
    }

    const existing = await this.port.getByUserInRange(
      user.id,
      model.startDate,
      model.endDate,
    );

    if (existing) {
      throw new BadRequestException(
        'User already has a booking in the selected period',
      );
    }

    const { dailyPrice, price } = this.getCarPrices(
      car,
      model.startDate,
      model.endDate,
    );

    return this.port.create({
      user,
      car,
      price,
      dailyPrice,
      drivingLicense: user.licenseNumber,
      drivingLicenseExpiry: user.licenseValidUntil,
      startDate: model.startDate,
      endDate: model.endDate,
    } as unknown as BookingModel);
  }

  async dashboard(
    userRequest: Record<string, string>,
  ): Promise<BookingModel[]> {
    return await this.port.get({
      user: { id: userRequest.user.sub },
    } as unknown as BookingModel);
  }

  private getCarPrices(model: CarModel, from: Date, to: Date) {
    const prices = {
      mid: model.midSeasonPrice,
      peak: model.peakSeasonPrice,
      off: model.offSeasonPrice,
    };

    const dailyPrice = this.seasonUsecase.calculatePrice(prices);
    const price = this.seasonUsecase.calculatePrice(prices, from, to);

    return { dailyPrice, price };
  }
}
