import { ConstantTypes } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

class CropsConstantDto {
  @IsNumber()
  value: number;

  @IsString()
  reference: string;

  @IsString()
  comment: string;

  @IsEnum(ConstantTypes)
  type: ConstantTypes;
}

export class CreateCropsConstantsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CropsConstantDto)
  constants: CropsConstantDto[]
}
