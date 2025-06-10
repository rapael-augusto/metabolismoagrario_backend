import { IsNumber } from 'class-validator';

export class UpdateCultivarsConstantDto {
  @IsNumber()
  value: number;
}
