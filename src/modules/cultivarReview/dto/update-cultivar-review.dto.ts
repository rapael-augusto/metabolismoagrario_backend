import { UpdateEnvironmentDTO } from '@modules/environment/dto/update-environment.dto';
import { UpdateReferenceDto } from '@modules/reference/dto/update-reference.dto';
import { ConstantTypes } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class UpdateCultivarReviewDto {
  @IsOptional()
  @IsObject()
  constants: Partial<Record<ConstantTypes, number>>;

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
