import { CreateCultivarConstantDto } from '@modules/cultivars-constants/dto/create-cultivars-constant.dto';
import { CreateEnvironmentDTO } from '@modules/environment/dto/create-envirionment.dto';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { CreateReferenceDTO } from './create-reference.dto';
import { OmitType } from '@nestjs/mapped-types';

export class CultivarConstantDto extends OmitType(CreateCultivarConstantDto, [
  'referenceId',
  'environmentId',
] as const) {}

export class ReferenceDto extends OmitType(CreateReferenceDTO, [
  'cultivarId',
] as const) {}

export class CreateFullReferenceDTO {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CultivarConstantDto)
  constants: CultivarConstantDto[];

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateEnvironmentDTO)
  environment: CreateEnvironmentDTO;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ReferenceDto)
  reference: ReferenceDto;
}
