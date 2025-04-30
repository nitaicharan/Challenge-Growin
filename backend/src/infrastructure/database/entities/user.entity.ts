import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column({ name: 'license_number' })
  licenseNumber!: string;

  @Column({
    name: 'license_valid_until',
    type: 'date',
  })
  licenseValidUntil!: Date;
}
