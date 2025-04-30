import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('cars')
export class CarEntity extends BaseEntity {
  @Column()
  brand!: string;

  @Column()
  model!: string;

  @Column()
  image!: string;

  @Column()
  stock!: number;

  @Column({ name: 'peak_season_price' })
  peakSeasonPrice!: number;

  @Column({ name: 'mid_season_price' })
  midSeasonPrice!: number;

  @Column({ name: 'off_season_price' })
  offSeasonPrice!: number;
}
