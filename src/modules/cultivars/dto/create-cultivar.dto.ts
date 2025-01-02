import { ReviewStatus } from '@prisma/client';
import { IsEnum, IsOptional, Length } from 'class-validator';

export class CreateCultivarDto {
  @Length(1, 80)
  name: string;

  @IsOptional()
  @IsEnum(ReviewStatus)
  status: ReviewStatus;
}
