import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  name!: string;
  email!: string;
  password!: string;
  licenseNumber!: string;
  licenseValidUntil!: Date;
}
