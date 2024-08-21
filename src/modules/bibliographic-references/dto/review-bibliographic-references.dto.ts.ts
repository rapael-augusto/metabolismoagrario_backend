import { PartialType } from '@nestjs/mapped-types';
import { CreateBibliographicReferenceDto } from './create-bibliographic-references.dto.ts';

export class ReviewBibliographicReferenceDto extends PartialType(CreateBibliographicReferenceDto) {
}
