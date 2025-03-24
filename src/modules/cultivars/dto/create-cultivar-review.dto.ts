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
  referenceId: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
