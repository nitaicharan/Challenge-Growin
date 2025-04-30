import { BaseModel } from './base.model';

export class SeasonModel extends BaseModel {
  name!: string;
  private _startDate!: Date;
  private _endDate!: Date;

  public get startDate(): Date {
    return this._startDate;
  }

  public set startDate(value: Date) {
    if (value > this._endDate) {
      throw new Error('Start date cannot be after end date');
    }

    this._startDate = value;
  }

  public get endDate(): Date {
    return this._endDate;
  }

  public set endDate(value: Date) {
    if (this._startDate == undefined) {
      throw new Error('Start date has to be set before date');
    }

    if (value < this._startDate) {
      throw new Error('End date cannot be before start date');
    }

    this._endDate = value;
  }
}
