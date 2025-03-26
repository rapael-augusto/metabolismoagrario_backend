import { ConstantTypes } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCultivarConstantDto {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsEnum(ConstantTypes)
  @IsNotEmpty()
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
