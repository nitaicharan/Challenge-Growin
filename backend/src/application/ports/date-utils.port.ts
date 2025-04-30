import { SeasonModel } from 'src/domain/models/season.model';

export interface IDateUtilsPort {
  getSeasonDays: (
    season: SeasonModel,
    from: Date,
    to: Date,
  ) => number | undefined;
  listSeasons(): SeasonModel[];
}

export const IDateUtilsPortToken = Symbol('IDateUtilsPortToken');
