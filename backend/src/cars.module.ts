import { Module } from '@nestjs/common';
import { CarsController } from './infrastructure/controllers/cars.controller';
import { CarsUsecases } from './application/usecases/cars.usecases';
import { ICarsPortToken } from './application/ports/cars.port';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './infrastructure/database/entities/car.entity';
import { CarsRepository } from './infrastructure/database/repositories/cars.repository';
import { SeasonsModule } from './seasons.module';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity]), SeasonsModule],
  controllers: [CarsController],
  providers: [
    CarsUsecases,
    {
      provide: ICarsPortToken,
      useClass: CarsRepository,
    },
  ],
  exports: [CarsUsecases],
})
export class CarsModule {}
