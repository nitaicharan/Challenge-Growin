import { Test, TestingModule } from '@nestjs/testing';
import { CarsUsecases } from './cars.usecases';
import { ICarsPortToken } from '../ports/cars.port';
import { SeasonsUsecases } from './seasons.usecase';

describe('CarsUsecases', () => {
  const peakSeasonPrice = 98.43;
  const midSeasonPrice = 76.89;
  const offSeasonPrice = 53.65;

  let usecase: CarsUsecases;

  const repositoryMock = {
    list: jest.fn(),
  };

  const seasonsUsecasesMock = {
    calculatePrice: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsUsecases,
        {
          provide: SeasonsUsecases,
          useValue: seasonsUsecasesMock,
        },
        {
          provide: ICarsPortToken,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    usecase = module.get(CarsUsecases);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should return only `dailyPrice` when no booking period is specified', async () => {
    jest.useFakeTimers({ now: new Date(2025, 0, 1) });
    repositoryMock.list.mockReturnValue(
      Promise.resolve({
        data: [{ peakSeasonPrice, midSeasonPrice, offSeasonPrice }],
      }),
    );

    seasonsUsecasesMock.calculatePrice.mockReturnValue(offSeasonPrice);

    const result = await usecase.list({} as any);

    expect(result.data).toContainEqual(
      expect.objectContaining({
        dailyPrice: expect.anything(),
      }),
    );
  });

  it('should return only `bookingPrice` when no booking period is specified', async () => {
    jest.useFakeTimers({ now: new Date(2025, 0, 1) });
    repositoryMock.list.mockReturnValue(
      Promise.resolve({
        data: [{ peakSeasonPrice, midSeasonPrice, offSeasonPrice }],
      }),
    );

    seasonsUsecasesMock.calculatePrice.mockReturnValue(offSeasonPrice);

    const year = new Date().getFullYear();
    const result = await usecase.list({
      from: new Date(year, 8, 15),
      to: new Date(year, 10, 0),
    } as any);

    expect(result.data).toContainEqual(
      expect.objectContaining({
        dailyPrice: expect.anything(),
        bookingPrice: expect.anything(),
      }),
    );
  });
});
