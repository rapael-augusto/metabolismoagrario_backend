import {
  ArrayMinSize,
  IsArray,
  IsString,
} from 'class-validator';

export class DeleteManyReferenceDTO {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  references: string[];
}