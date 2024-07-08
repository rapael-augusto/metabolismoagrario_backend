import { IsOptional, IsString, IsInt } from 'class-validator';

export class ReviewBibliographicReferenceDto {
  @IsString()
  @IsOptional()
  authorName?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  source?: string;
}
