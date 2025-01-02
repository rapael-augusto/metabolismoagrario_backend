import { IsEmail, IsString } from 'class-validator';

export class CreatePasswordResetDTO {
  @IsEmail()
  @IsString()
  email: string;
}
