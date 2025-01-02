import { UserRoles } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @Length(4, 100)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  password: string;

  @IsEnum(UserRoles)
  role: UserRoles;
}
