import { ReviewStatus } from "@prisma/client";
import { IsEnum } from "class-validator";

export enum ReviewStatusBody {
  Approved = 'Approved',
  Declined = 'Declined',
}

export class ReviewCropDto {
  @IsEnum(ReviewStatusBody)
  status: Omit<ReviewStatus, 'Pending'>
}
