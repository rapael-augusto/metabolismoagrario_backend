import { BiomeTypes, ClimatesTypes } from '@/types/index';
import {
  ConstantTypes,
  CultivationSystem,
  IrrigationTypes,
  SoilTypes,
} from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCultivarConstantDto {
  @IsNumber()
  value: number;

  @IsEnum(ConstantTypes)
  type: ConstantTypes;

  @IsOptional()
  @IsString()
  comment: string;

  @IsString()
  @IsNotEmpty()
  environmentId: string;

  @IsString()
  @IsNotEmpty()
  referenceId: string;
}
