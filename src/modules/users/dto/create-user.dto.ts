import { UserRoles } from "@prisma/client"
import { IsEmail, IsEnum, Length } from "class-validator"

export class CreateUserDto {
  @Length(4, 100)
  name: string

  @IsEmail()
  email: string

  @Length(5, 120)
  password: string

  @IsEnum(UserRoles)
  role: UserRoles
}
