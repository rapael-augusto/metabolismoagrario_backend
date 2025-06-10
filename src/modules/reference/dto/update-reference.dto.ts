import { ReferenceDto } from './create-full-reference.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateReferenceDto extends PartialType(ReferenceDto) {}
