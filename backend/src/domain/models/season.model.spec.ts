import { Test, TestingModule } from '@nestjs/testing';
import { SeasonModel } from './season.model';

describe('SeasonModel', () => {
  let instance: SeasonModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonModel],
    }).compile();

    instance = module.get<SeasonModel>(SeasonModel);
  });

  it('should not allow `startDate` after `endDate`', () => {
    expect(() => {
      instance.startDate = new Date('2000-01-02');
      instance.endDate = new Date('2000-01-01');
    }).toThrow();
  });

  it('should not allow `endDate` before `startDate`', () => {
    instance.startDate = new Date('2000-01-02');

    expect(() => {
      instance.endDate = new Date('2000-01-01');
    }).toThrow();
  });

  it('should allow `startDate` equal to `endDate`', () => {
    expect(() => {
      instance.startDate = new Date('2000-01-01');
      instance.endDate = new Date('2000-01-01');
    }).not.toThrow();
  });

  it('should allow setting `startDate` when `endDate` is unset', () => {
    expect(() => {
      instance.startDate = new Date('2000-01-01');
    }).not.toThrow();
  });

  it('should not allow setting `endDate` when `startDate` is unset', () => {
    expect(() => {
      instance.endDate = new Date('2001-05-01');
    }).toThrow();
  });
});
