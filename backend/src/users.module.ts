import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/database/entities/user.entity';
import { UsersUsecases } from './application/usecases/users.usecase';
import { IUsersPortToken } from './application/ports/users.port';
import { UsersRepository } from './infrastructure/database/repositories/users.repository';
import { UsersController } from './infrastructure/controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersUsecases,
    {
      provide: IUsersPortToken,
      useClass: UsersRepository,
    },
  ],
  exports: [UsersUsecases],
})
export class UsersModule {}
