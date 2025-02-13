import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCultivarReviewDto {
  @IsUUID()
  @IsString()
  id: string;

  @IsString()
  userId: string;

  @IsString()
  cultivarId: string;

  @IsString()
  @IsOptional()
  justification?: string;

  @IsOptional()
  @IsDate()
  reviewedAt?: Date;

  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
