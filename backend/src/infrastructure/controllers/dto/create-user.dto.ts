import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  licenseNumber!: string;

  @IsNotEmpty()
  @Type(() => Date)
  licenseValidUntil!: Date;
}
