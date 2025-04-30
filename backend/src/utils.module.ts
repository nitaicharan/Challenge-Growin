import { Module } from '@nestjs/common';
import { IDateUtilsPortToken } from './application/ports/date-utils.port';
import { DateUtils } from './infrastructure/utils/date.utils';

@Module({
  providers: [
    {
      provide: IDateUtilsPortToken,
      useClass: DateUtils,
    },
  ],
  exports: [
    {
      provide: IDateUtilsPortToken,
      useClass: DateUtils,
    },
  ],
})
export class UtilsModule {}
