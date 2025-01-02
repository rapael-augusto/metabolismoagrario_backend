import { PartialType } from '@nestjs/mapped-types';
import { CreateCultivarDto } from './create-cultivar.dto';

export class UpdateCultivarDto extends PartialType(CreateCultivarDto) {}
