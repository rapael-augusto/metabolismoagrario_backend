import { CultivarConstantDto } from '@modules/cultivars-constants/dto/create-many-cultivars-constants.dto';
import { CreateEnvironmentDTO } from '@modules/environment/dto/create-envirionment.dto';
import { UpdateEnvironmentDTO } from '@modules/environment/dto/update-environment.dto';
import { ReferenceDto } from '@modules/reference/dto/create-full-reference.dto';
import { UpdateReferenceDto } from '@modules/reference/dto/update-reference.dto';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateCultivarsConstantReviewDto {
  @IsString()
  id: string;

  @IsNumber()
  value: number;
}

export class UpdateCultivarReviewDto {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateCultivarsConstantReviewDto)
  constants: UpdateCultivarsConstantReviewDto[];

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateEnvironmentDTO)
  environment: UpdateEnvironmentDTO;

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateReferenceDto)
  reference: UpdateReferenceDto;
}
