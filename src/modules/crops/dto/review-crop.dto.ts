
export enum ReviewStatusBody {
  Approved = 'Approved',
  Declined = 'Declined',
}

export class ReviewCropDto {
  // @IsEnum(ReviewStatusBody)
  // status: Omit<ReviewStatus, 'Pending'>
}
