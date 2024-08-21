import { Length } from "class-validator"

export class CreateCustomBiomeDto {
  @Length(1, 80)
  name: string
}