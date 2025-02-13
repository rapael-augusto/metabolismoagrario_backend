import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCultivarReviewDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3)
  Justification?: string;
}
