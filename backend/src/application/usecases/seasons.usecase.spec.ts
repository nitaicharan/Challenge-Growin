import { Test, TestingModule } from '@nestjs/testing';
import { SeasonsUsecases } from './seasons.usecase';
import { IDateUtilsPortToken } from '../ports/date-utils.port';
import { when } from 'jest-when';
import { SeasonModel } from 'src/domain/models/season.model';

describe('SeasonsUsecases', () => {
  const peakSeasonPrice = 98.43;
  const midSeasonPrice = 76.89;
  const offSeasonPrice = 53.65;
  let usecase: SeasonsUsecases;

  const dateUtilsMock = {
    getSeasonDays: jest.fn(),
    listSeasons: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeasonsUsecases,
        {
          provide: IDateUtilsPortToken,
          useValue: dateUtilsMock,
        },
      ],
    }).compile();

    usecase = module.get(SeasonsUsecases);
  });

  beforeEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  const year = 2025;
  const off1 = new SeasonModel();
  off1.startDate = new Date(year, 0, 1);
  off1.endDate = new Date(year, 1, 28);
  off1.name = 'off';

  const mid1 = new SeasonModel();
  mid1.startDate = new Date(year, 2, 1);
  mid1.endDate = new Date(year, 4, 31);
  mid1.name = 'mid';

  const peak = new SeasonModel();
  peak.startDate = new Date(year, 5, 1);
  peak.endDate = new Date(year, 8, 14);
  peak.name = 'peak';

  const mid2 = new SeasonModel();
  mid2.startDate = new Date(year, 8, 15);
  mid2.endDate = new Date(year, 9, 31);
  mid2.name = 'mid';

  const off2 = new SeasonModel();
  off2.startDate = new Date(year, 10, 1);
  off2.endDate = new Date(year, 11, 31);
  off2.name = 'off';

  const callRange = (
    season: SeasonModel,
    from: Date,
    to: Date,
    days: number,
  ) => {
    jest.useFakeTimers({ now: from });
    dateUtilsMock.listSeasons.mockReturnValue([off1, mid1, peak, mid2, off2]);
    when(dateUtilsMock.getSeasonDays)
      .calledWith(season, from, to)
      .mockReturnValue(days);

    return usecase.calculatePrice(
      {
        peak: peakSeasonPrice,
        mid: midSeasonPrice,
        off: offSeasonPrice,
      },
      from,
      to,
    );
  };

  describe('off-season (Jan 1–Feb end, Nov 1–Dec end)', () => {
    it('should return offSeasonPrice on Jan 1', async () => {
      await expect(
        callRange(off1, new Date(2025, 0, 1), new Date(2025, 0, 1), 1),
      ).resolves.toEqual(offSeasonPrice);
    });

    it('should return offSeasonPrice on Feb 28 (last day)', async () => {
      await expect(
        callRange(off1, new Date(2025, 1, 28), new Date(2025, 1, 28), 1),
      ).resolves.toEqual(offSeasonPrice);
    });

    it('should return offSeasonPrice on Nov 1', async () => {
      await expect(
        callRange(off2, new Date(2025, 10, 1), new Date(2025, 10, 1), 1),
      ).resolves.toEqual(offSeasonPrice);
    });

    it('should return offSeasonPrice on Dec 31', async () => {
      await expect(
        callRange(off2, new Date(2025, 11, 31), new Date(2025, 11, 31), 1),
      ).resolves.toEqual(offSeasonPrice);
    });

    it('should sum offSeasonPrice over entire first off-season', async () => {
      const days = 59;
      const expected = offSeasonPrice * days;
      await expect(
        callRange(off1, off1.startDate, off1.endDate, days),
      ).resolves.toEqual(expected);
    });

    it('should sum offSeasonPrice over entire second off-season', async () => {
      const days = 61;
      const expected = offSeasonPrice * days;
      await expect(
        callRange(off2, off2.startDate, off2.endDate, days),
      ).resolves.toEqual(expected);
    });
  });

  describe('mid-season (Mar 1–May end, Sep 15–Oct end)', () => {
    it('should return midSeasonPrice on Mar 1', async () => {
      await expect(
        callRange(mid1, new Date(2025, 2, 1), new Date(2025, 2, 1), 1),
      ).resolves.toEqual(midSeasonPrice);
    });

    it('should return midSeasonPrice on May 31', async () => {
      await expect(
        callRange(mid1, new Date(2025, 4, 31), new Date(2025, 4, 31), 1),
      ).resolves.toEqual(midSeasonPrice);
    });

    it('should return midSeasonPrice on Sep 15', async () => {
      await expect(
        callRange(mid2, new Date(2025, 8, 15), new Date(2025, 8, 15), 1),
      ).resolves.toEqual(midSeasonPrice);
    });

    it('should return midSeasonPrice on Oct 31', async () => {
      await expect(
        callRange(mid2, new Date(2025, 9, 31), new Date(2025, 9, 31), 1),
      ).resolves.toEqual(midSeasonPrice);
    });

    it('should sum midSeasonPrice over entire first mid-season', async () => {
      const days = 92;
      const expected = midSeasonPrice * days;
      await expect(
        callRange(mid1, mid1.startDate, mid1.endDate, days),
      ).resolves.toEqual(expected);
    });

    it('should sum midSeasonPrice over entire second mid-season', async () => {
      const days = 47;
      const expected = midSeasonPrice * days;
      await expect(
        callRange(mid2, mid2.startDate, mid2.endDate, days),
      ).resolves.toEqual(expected);
    });
  });

  describe('peak-season (Jun 1–Sep 14)', () => {
    it('should return peakSeasonPrice on Jun 1', async () => {
      await expect(
        callRange(peak, new Date(2025, 5, 1), new Date(2025, 5, 1), 1),
      ).resolves.toEqual(peakSeasonPrice);
    });

    it('should return peakSeasonPrice on Sep 14', async () => {
      await expect(
        callRange(peak, new Date(2025, 8, 14), new Date(2025, 8, 14), 1),
      ).resolves.toEqual(peakSeasonPrice);
    });

    it('should sum peakSeasonPrice over entire peak-season', async () => {
      const days = 106;
      const expected = peakSeasonPrice * days;
      await expect(
        callRange(peak, peak.startDate, peak.endDate, days),
      ).resolves.toEqual(expected);
    });
  });
});
