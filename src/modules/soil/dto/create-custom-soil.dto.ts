import { Length } from "class-validator"

export class CreateCustomSoilDto {
  @Length(1, 80)
  name: string
}