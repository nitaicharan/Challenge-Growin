import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CarEntity } from './car.entity';
import {
  BookigStatus,
  BookingStatusValues,
} from '../../../domain/types/book.type';
import { UserEntity } from './user.entity';

@Entity('bookings')
export class BookingEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: CarEntity;

  @ManyToOne(() => CarEntity)
  @JoinColumn({ name: 'car_id' })
  car!: CarEntity;

  @Column({ type: 'date', name: 'start_date' })
  startDate!: Date;

  @Column({ type: 'date', name: 'end_date' })
  endDate!: Date;

  @Column({ type: 'numeric', name: 'price' })
  price!: number;

  @Column({ type: 'numeric', name: 'daily_price' })
  dailyPrice!: number;

  @Column({ type: 'varchar', name: 'driving_license', length: 100 })
  drivingLicense!: string;

  @Column({ type: 'date', name: 'driving_license_expiry' })
  drivingLicenseExpiry!: Date;

  @Column({
    type: 'enum',
    enum: BookingStatusValues,
    default: BookingStatusValues.CREATED,
  })
  status!: BookigStatus;
}
