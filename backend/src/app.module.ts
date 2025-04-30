import { Module } from '@nestjs/common';
import { CarsModule } from './cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './infrastructure/database/datasource';
import { SeasonsModule } from './seasons.module';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { AuthGuard } from './infrastructure/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { BookingsModule } from './bookings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSource.options,
      autoLoadEntities: true,
    }),
    CarsModule,
    SeasonsModule,
    BookingsModule,
    UsersModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
