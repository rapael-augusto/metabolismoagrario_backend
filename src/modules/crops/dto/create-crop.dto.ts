import { Climates } from "@prisma/client";
import { IsEnum, Length } from "class-validator"

export class CreateCropDto {
  @Length(1, 80)
  name: string

  @Length(1, 80)
  scientificName: string

  @IsEnum(Climates)
  climate: Climates;
}
