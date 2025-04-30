import { BaseModel } from '../models/base.model';
import { PageQueryModel } from './page-query.model';

export type PageResultModel<T extends any> = PageQueryModel & {
  data: T[];
  total: number;
};
