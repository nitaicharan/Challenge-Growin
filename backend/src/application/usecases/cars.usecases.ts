import { Inject, Injectable } from '@nestjs/common';
import { ICarsPort, ICarsPortToken } from '../ports/cars.port';
import { CarModel } from 'src/domain/models/car.model';
import { PageQueryModel } from 'src/domain/types/page-query.model';
import { SeasonsUsecases } from './seasons.usecase';

@Injectable()
export class CarsUsecases {
  constructor(
    @Inject(ICarsPortToken)
    readonly port: ICarsPort,
    private readonly seasonUsecase: SeasonsUsecases,
  ) {}

  async list(params: PageQueryModel & { from?: Date; to?: Date }) {
    const [models, total] = await this.port.list(params);

    const result = models.map((model: CarModel) => {
      const result = this.getCarPrices(model, params.from, params.to);
      const { offSeasonPrice, peakSeasonPrice, midSeasonPrice, ...rest } =
        result;

      return rest;
    });

    return { ...params, total, data: result };
  }

  async get(id: CarModel['id']) {
    const model = await this.port.get(id);
    if (model == null) return null;

    return this.getCarPrices(model);
  }

  private getCarPrices(model: CarModel, from?: Date, to?: Date) {
    const prices = {
      mid: model.midSeasonPrice,
      peak: model.peakSeasonPrice,
      off: model.offSeasonPrice,
    };

    const dailyPrice = this.seasonUsecase.calculatePrice(prices);

    if (from == undefined || to == undefined) {
      return { ...model, dailyPrice };
    }

    const bookingPrice = this.seasonUsecase.calculatePrice(prices, from, to);

    return { ...model, dailyPrice, bookingPrice };
  }
}
