import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsersPort } from 'src/application/ports/users.port';
import { UserEntity } from '../entities/user.entity';
import { UserModel } from 'src/domain/models/user.model';

@Injectable()
export class UsersRepository implements IUsersPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  create(model: UserModel): Promise<UserModel> {
    return this.repository.save(model);
  }

  get(id: UserModel['id']): Promise<UserModel | null> {
    return this.repository.findOneBy({ id });
  }

  getByEmail(email: string): Promise<UserModel | null> {
    return this.repository.findOneBy({ email });
  }
}
