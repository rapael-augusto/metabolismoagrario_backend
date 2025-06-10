import { PartialType } from '@nestjs/mapped-types';
import { CreateEnvironmentDTO } from './create-envirionment.dto';

export class UpdateEnvironmentDTO extends PartialType(CreateEnvironmentDTO) {}
