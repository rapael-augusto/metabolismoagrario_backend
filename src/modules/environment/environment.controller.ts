import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { CreateEnvironmentDTO } from './dto/create-envirionment.dto';

@Controller('environments')
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}
  @Post()
  async create(@Body() data: CreateEnvironmentDTO) {
    return await this.environmentService.create(data);
  }

  @Delete('/:environmentId/reference/:referenceId/cultivar/:cultivarId')
  async remove(
    @Param('environmentId') environmentId: string,
    @Param('referenceId') referenceId: string,
    @Param('cultivarId') cultivarId: string,
  ) {
    return await this.environmentService.remove({environmentId, referenceId, cultivarId});
  }
}
