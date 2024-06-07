import { Length } from "class-validator";

export class CreateCultivarDto {
  @Length(1, 80)
  name: string
}
