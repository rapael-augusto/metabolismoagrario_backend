import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateCultivarReviewDto {
  @IsString()
  userId: string;

  @IsString()
  cultivarId: string;

  @IsString()
  referenceId: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
