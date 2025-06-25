import { IsString } from 'class-validator';

export class DeleteEnvironmentDTO {
  @IsString()
  environmentId: string;

  @IsString()
  referenceId: string;

  @IsString()
  cultivarId: string;
}
