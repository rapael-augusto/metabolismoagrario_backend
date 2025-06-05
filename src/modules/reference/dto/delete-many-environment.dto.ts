import {
  ArrayMinSize,
  IsArray,
  IsString,
} from 'class-validator';

export class DeleteManyEnvironmentsDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  environments: string[];
}