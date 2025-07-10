import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IrrigationTypes } from '@prisma/client';
import { SoilTypes } from '@prisma/client';
import { CultivationSystem } from '@prisma/client';
import { BiomeTypes, ClimatesTypes } from '@/types/index';
import { Transform } from 'class-transformer';

export class CreateEnvironmentDTO {
  @IsOptional()
  @IsEnum(ClimatesTypes)
  @Transform(({ value }) => (value === '' ? null : value))
  climate?: ClimatesTypes;

  @IsOptional()
  @IsEnum(BiomeTypes)
  @Transform(({ value }) => (value === '' ? null : value))
  biome?: BiomeTypes;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? null : value))
  customBiome?: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  irrigation?: IrrigationTypes;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (value === '' ? null : value))
  country: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  soil?: SoilTypes;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? null : value))
  customSoil?: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  cultivationSystem?: CultivationSystem;
}
