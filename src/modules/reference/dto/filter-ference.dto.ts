import { BiomeTypes, ClimatesTypes } from '@/types/index';
import { CultivationSystem, IrrigationTypes, SoilTypes } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FilterReferenceDTO {
  @IsOptional()
  @IsEnum(ClimatesTypes)
  climate?: ClimatesTypes;

  @IsOptional()
  @IsEnum(BiomeTypes)
  biome?: BiomeTypes;

  @IsOptional()
  irrigation?: IrrigationTypes;

  @IsString()
  @IsOptional()
  country: string;

  @IsOptional()
  soil?: SoilTypes;

  @IsOptional()
  cultivationSystem?: CultivationSystem;
}
