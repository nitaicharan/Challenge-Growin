import { Module } from '@nestjs/common';
import { AuthUsecases } from './application/usecases/auth.usecase';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users.module';
import { AuthController } from './infrastructure/controllers/auth.controller';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthUsecases],
})
export class AuthModule {}
