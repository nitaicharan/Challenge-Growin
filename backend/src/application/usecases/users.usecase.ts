import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from 'src/domain/models/user.model';
import { IUsersPort, IUsersPortToken } from '../ports/users.port';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersUsecases {
  constructor(
    @Inject(IUsersPortToken)
    readonly port: IUsersPort,
  ) {}

  async create(model: UserModel): Promise<UserModel> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(model.password, salt);

    return this.port.create({ ...model, password: hash });
  }

  get(id: UserModel['id']): Promise<UserModel | null> {
    return this.port.get(id);
  }

  getByEmail(email: String): Promise<UserModel | null> {
    return this.port.getByEmail(email);
  }
}
