import { IsString, IsInt } from 'class-validator';

export class CreateBibliographicReferenceDto {
  @IsString()
  authorName: string;

  @IsString()
  title: string;

  @IsInt()
  year: number;

  @IsString()
  source: string;
}
