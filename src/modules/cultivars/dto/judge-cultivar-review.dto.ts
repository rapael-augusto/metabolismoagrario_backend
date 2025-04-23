import { ReviewStatus } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class JudgeCultivarReviewDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3)
  Justification?: string;

  @IsEnum(ReviewStatus)
  @IsNotEmpty()
  status: ReviewStatus;
}
