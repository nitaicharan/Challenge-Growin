import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersUsecases } from './users.usecase';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/domain/models/user.model';

@Injectable()
export class AuthUsecases {
  constructor(
    private userUsecase: UsersUsecases,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<Record<string, string>> {
    const user = await this.userUsecase.getByEmail(email);

    if (user == null) {
      throw new UnauthorizedException();
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const isMatch = await bcrypt.compare(password, hash);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const access_token = await this.jwtService.signAsync({ sub: user.id });

    return {
      access_token,
    };
  }

  async getProfile(userRequest: Record<string, string>): Promise<UserModel> {
    const user = await this.userUsecase.get(userRequest.sub);

    if (!user) throw new NotFoundException();

    return user;
  }
}
