import { DateTime, Interval } from 'luxon';
import { IDateUtilsPort } from 'src/application/ports/date-utils.port';
import { SeasonModel } from 'src/domain/models/season.model';

export class DateUtils implements IDateUtilsPort {
  getSeasonDays = (season: SeasonModel, from = new Date(), to = new Date()) => {
    const fromDateTime = DateTime.fromJSDate(from).startOf('day');
    const toDateTime = DateTime.fromJSDate(to).endOf('day');

    const startDateTime = DateTime.fromJSDate(season.startDate);
    const endDateTime = DateTime.fromJSDate(season.endDate);
    const interval = Interval.fromDateTimes(startDateTime, endDateTime);

    if (!interval.contains(fromDateTime) || !interval.contains(toDateTime)) {
      return 0;
    }

    return interval.length('days');
  };

  listSeasons = () => {
    const year = new Date().getFullYear();

    // TODO: add seasons date in cahe
    const off1 = new SeasonModel();
    off1.startDate = new Date(year, 0, 1);
    off1.endDate = new Date(year, 2, 0);
    off1.name = 'off';

    const mid1 = new SeasonModel();
    mid1.startDate = new Date(year, 2, 1);
    mid1.endDate = new Date(year, 5, 0);
    mid1.name = 'mid';

    const peak = new SeasonModel();
    peak.startDate = new Date(year, 5, 1);
    peak.endDate = new Date(year, 8, 14);
    peak.name = 'peak';

    const mid2 = new SeasonModel();
    mid2.startDate = new Date(year, 8, 15);
    mid2.endDate = new Date(year, 10, 0);
    mid2.name = 'mid';

    const off2 = new SeasonModel();
    off2.startDate = new Date(year, 10, 15);
    off2.endDate = new Date(year, 12, 0);
    off2.name = 'off';

    return [off1, mid1, peak, mid2, off2];
  };
}
