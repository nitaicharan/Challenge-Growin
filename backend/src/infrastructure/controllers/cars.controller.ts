import { Controller, Get, Param, Query } from '@nestjs/common';
import { CarsUsecases } from 'src/application/usecases/cars.usecases';
import { CarModel } from 'src/domain/models/car.model';
import { PageQueryModel } from 'src/domain/types/page-query.model';

@Controller('cars')
export class CarsController {
  constructor(private readonly usecase: CarsUsecases) {}

  @Get()
  list(@Query() page: PageQueryModel) {
    return this.usecase.list({ ...page });
  }

  @Get(':id')
  get(@Param('id') id: CarModel['id']) {
    return this.usecase.get(id);
  }
}
