import { Injectable } from '@nestjs/common';
import { ICarsPort } from 'src/application/ports/cars.port';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CarModel } from 'src/domain/models/car.model';
import { CarEntity } from '../entities/car.entity';
import { PageQueryModel } from 'src/domain/types/page-query.model';

@Injectable()
export class CarsRepository implements ICarsPort {
  constructor(
    @InjectRepository(CarEntity)
    private readonly repository: Repository<CarEntity>,
  ) {}

  list(page: PageQueryModel) {
    return this.repository.findAndCount({ ...page });
  }

  get(id: CarModel['id']): Promise<CarModel | null> {
    return this.repository.findOneBy({ id });
  }
}
