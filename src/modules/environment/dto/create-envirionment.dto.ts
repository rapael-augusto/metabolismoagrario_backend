import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IrrigationTypes } from '@prisma/client';
import { SoilTypes } from '@prisma/client';
import { CultivationSystem } from '@prisma/client';
import { BiomeTypes, ClimatesTypes } from '@/types/index';

export class CreateEnvironmentDTO {
  @IsOptional()
  @IsEnum(ClimatesTypes)
  climate?: ClimatesTypes;

  @IsOptional()
  @IsEnum(BiomeTypes)
  biome?: BiomeTypes;

  @IsOptional()
  @IsString()
  customBiome?: string;

  @IsOptional()
  irrigation?: IrrigationTypes;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsOptional()
  soil?: SoilTypes;

  @IsOptional()
  @IsString()
  customSoil?: string;

  @IsOptional()
  cultivationSystem?: CultivationSystem;
}
