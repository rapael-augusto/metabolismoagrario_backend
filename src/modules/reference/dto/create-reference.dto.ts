import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateReferenceDTO {
  @IsString()
  @Length(3, 255)
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @Length(3, 500)
  comment?: string;

  @IsString()
  @IsNotEmpty()
  cultivarId: string;
}
