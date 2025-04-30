import { BaseModel } from './base.model';

export class CarModel extends BaseModel {
  brand!: string;
  model!: string;
  image?: string;
  stock!: number;
  peakSeasonPrice!: number;
  midSeasonPrice!: number;
  offSeasonPrice!: number;
}
