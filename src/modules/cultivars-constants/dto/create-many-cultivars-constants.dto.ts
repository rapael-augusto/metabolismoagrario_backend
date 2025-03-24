import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateCultivarDto } from '@modules/cultivars/dto/create-cultivar.dto';
import { OmitType } from '@nestjs/mapped-types';
import { CreateCultivarConstantDto } from './create-cultivars-constant.dto';

export class CultivarConstantDto extends OmitType(CreateCultivarConstantDto, [
  'referenceId',
  'environmentId',
] as const) {}

export class CreateManyCultivarConstantsDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CultivarConstantDto)
  constants: CultivarConstantDto[];

  @IsString()
  @IsNotEmpty()
  referenceId: string;

  @IsString()
  @IsNotEmpty()
  environmentId: string;
}
