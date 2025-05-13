import { ReviewStatus } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

export class RejectCultivarReviewDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3)
  justification?: string;

  @IsEnum(ReviewStatus)
  @IsNotEmpty()
  @ValidateIf(
    (o) =>
      o.status === ReviewStatus.CHANGES_REQUESTED ||
      o.status === ReviewStatus.REJECTED,
  )
  status: ReviewStatus;
}
