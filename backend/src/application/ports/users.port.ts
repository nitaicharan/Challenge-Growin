import { UserModel } from 'src/domain/models/user.model';

export interface IUsersPort {
  get(id: string): Promise<UserModel | null>;
  getByEmail(email: String): Promise<UserModel | null>;
  create(model: UserModel): Promise<UserModel>;
}

export const IUsersPortToken = Symbol();
