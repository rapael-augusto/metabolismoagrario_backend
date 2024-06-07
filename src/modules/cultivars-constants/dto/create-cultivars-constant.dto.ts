import { Climates, ConstantTypes, CultivationSystem, IrrigationTypes } from "@prisma/client";
import { IsEnum, IsNumber, IsString } from "class-validator";


export class CreateCultivarConstantDto {
  @IsNumber()
  value: number;

  @IsString()
  reference: string;

  @IsString()
  comment: string;

  @IsEnum(ConstantTypes)
  type: ConstantTypes;

  @IsEnum(Climates)
  climate: Climates;

  @IsString()
  biome: string

  @IsEnum(IrrigationTypes)
  irrigation: IrrigationTypes

  @IsString()
  country: string

  @IsEnum(CultivationSystem)
  cultivationSystem: CultivationSystem
}
