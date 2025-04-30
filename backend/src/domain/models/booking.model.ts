import { BookigStatus } from '../types/book.type';
import { BaseModel } from './base.model';
import { CarModel } from './car.model';
import { UserModel } from './user.model';

export class BookingModel extends BaseModel {
  car!: CarModel;
  user!: UserModel;
  startDate!: Date;
  endDate!: Date;
  price!: number;
  dailyPrice!: number;
  status!: BookigStatus;
  drivingLicense!: string;
  drivingLicenseExpiry!: Date;
}
