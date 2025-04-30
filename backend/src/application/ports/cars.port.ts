import { CarModel } from 'src/domain/models/car.model';
import { PageQueryModel } from 'src/domain/types/page-query.model';

export interface ICarsPort {
  list(page: PageQueryModel): Promise<[CarModel[], number]>;
  get(id: CarModel['id']): Promise<CarModel | null>;
}

export const ICarsPortToken = Symbol();
