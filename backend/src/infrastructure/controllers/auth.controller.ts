import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthUsecases } from 'src/application/usecases/auth.usecase';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from '../decorators/public.decorator';
import { UserModel } from 'src/domain/models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly usecase: AuthUsecases) {}

  @Public()
  @Post('sign-in')
  signIn(@Body() data: SignInDto): Promise<Record<string, string>> {
    return this.usecase.signIn(data.email, data.password);
  }

  @Get('profile')
  profile(@Request() request: Record<string, string>): Promise<UserModel> {
    return this.usecase.getProfile(request);
  }
}
