import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CultivarConstantDto, ReferenceDto } from './create-full-reference.dto';
import { CreateEnvironmentDTO } from '@modules/environment/dto/create-envirionment.dto';
import { OmitType } from '@nestjs/mapped-types';

export class ReferenceUpdateCultivarConstantDto extends OmitType(
  CultivarConstantDto,
  ['type'] as const,
) {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class UpdateReferenceDto {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ReferenceUpdateCultivarConstantDto)
  constants: ReferenceUpdateCultivarConstantDto[];

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateEnvironmentDTO)
  environment: CreateEnvironmentDTO;

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ReferenceDto)
  reference: ReferenceDto;
}
