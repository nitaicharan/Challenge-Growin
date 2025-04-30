import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersUsecases } from 'src/application/usecases/users.usecase';
import { UserModel } from 'src/domain/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usecases: UsersUsecases) {}

  @Public()
  @Post()
  create(@Body() model: CreateUserDto): Promise<UserModel> {
    return this.usecases.create({ ...model } as unknown as UserModel);
  }
}
