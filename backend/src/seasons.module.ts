import { Module } from '@nestjs/common';
import { SeasonsUsecases } from './application/usecases/seasons.usecase';
import { UtilsModule } from './utils.module';

@Module({
  imports: [UtilsModule],
  providers: [SeasonsUsecases],
  exports: [SeasonsUsecases],
})
export class SeasonsModule {}
