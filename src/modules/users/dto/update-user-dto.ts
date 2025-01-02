import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  ValidateIf,
} from 'class-validator';
import { UserRoles } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto implements Partial<CreateUserDto> {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(3, 60)
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ValidateIf((data) => data.oldPassword)
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  password?: string;

  @ValidateIf((data) => data.password)
  @IsNotEmpty()
  oldPassword?: string;

  @IsEnum(UserRoles)
  @IsOptional()
  role?: UserRoles;
}
