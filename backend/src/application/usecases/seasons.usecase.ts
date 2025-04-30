import { Inject, Injectable } from '@nestjs/common';
import { IDateUtilsPort, IDateUtilsPortToken } from '../ports/date-utils.port';

@Injectable()
export class SeasonsUsecases {
  constructor(
    @Inject(IDateUtilsPortToken) private readonly dateUtilsPort: IDateUtilsPort,
  ) {}

  calculatePrice(
    prices: Record<'mid' | 'peak' | 'off', number>,
    from?: Date,
    to?: Date,
  ): number {
    const calcFrom = from ?? new Date();
    const calcTo = to ?? new Date();

    const seasons = this.dateUtilsPort.listSeasons();

    return seasons.reduce((total, season) => {
      const start = season.startDate > calcFrom ? season.startDate : calcFrom;
      const end = season.endDate < calcTo ? season.endDate : calcTo;

      const days = this.dateUtilsPort.getSeasonDays(season, start, end) ?? 0;
      const pricePerDay = prices[season.name] ?? 0;

      return total + days * pricePerDay;
    }, 0);
  }
}
