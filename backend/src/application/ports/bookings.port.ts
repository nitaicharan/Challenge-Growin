import { BookingModel } from 'src/domain/models/booking.model';

export interface IBookingsPort {
  getByUserInRange(
    userId: string,
    start: Date,
    end: Date,
  ): Promise<BookingModel | null>;
  create(model: BookingModel): Promise<BookingModel>;
  get(model: BookingModel): PromiseLike<BookingModel[]>;
}

export const IBookingsPortToken = Symbol();
