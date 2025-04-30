import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IBookingsPort } from 'src/application/ports/bookings.port';
import { BookingModel } from 'src/domain/models/booking.model';
import { BookingEntity } from '../entities/booking.entity';

@Injectable()
export class BookingsRepository implements IBookingsPort {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly repository: Repository<BookingEntity>,
  ) {}

  create(model: BookingModel): Promise<BookingModel> {
    return this.repository.save(model);
  }

  async getByUserInRange(
    userId: string,
    start: Date,
    end: Date,
  ): Promise<BookingModel | null> {
    const entity = this.repository
      .createQueryBuilder('booking')
      .where('booking.user_id = :userId', { userId })
      .andWhere('booking.startDate <= :end', { end })
      .andWhere('booking.endDate >= :start', { start })
      .getOne();

    return entity as unknown as BookingModel;
  }

  async get(model: BookingModel): Promise<BookingModel[]> {
    const entity = await this.repository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.car', 'car')
      .where('booking.user_id = :userId', { userId: model.user.id })
      .getMany();

    return entity as unknown as BookingModel[];
  }
}
