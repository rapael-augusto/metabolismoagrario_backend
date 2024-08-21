import { IsString } from 'class-validator';

export class CreateBibliographicReferenceDto {
  @IsString()
  link: string;

  @IsString()
  source: string;
}
