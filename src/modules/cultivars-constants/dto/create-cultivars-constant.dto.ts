import { BiomeTypes, ClimatesTypes } from "@/types/index";
import { ConstantTypes, CultivationSystem, IrrigationTypes, SoilTypes } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCultivarConstantDto {
  @IsNumber()
  value: number;

  @IsEnum(ConstantTypes)
  type: ConstantTypes;

  @IsString()
  comment: string;

  @IsOptional()
  @IsEnum(ClimatesTypes)
  climate?: ClimatesTypes;

  @IsOptional()
  @IsEnum(BiomeTypes)
  biome?: BiomeTypes;

  @IsOptional()
  @IsEnum(IrrigationTypes)
  irrigation?: IrrigationTypes

  @IsOptional()
  @IsString()
  country?: string

  @IsOptional()
  @IsEnum(CultivationSystem)
  cultivationSystem?: CultivationSystem

  @IsOptional()
  @IsEnum(SoilTypes)
  soil?: SoilTypes

  @IsOptional()
  @IsString()
  customSoil?: string

  @IsOptional()
  @IsString()
  customBiome?: string

  @IsString()
  linkReference: string
}
