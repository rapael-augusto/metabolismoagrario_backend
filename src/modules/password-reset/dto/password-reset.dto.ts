import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ResetPasswordDTO {
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    {
      message:
        'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números.',
    },
  )
  password: string;
}
