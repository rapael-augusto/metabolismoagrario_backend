import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { CreateEnvironmentDTO } from './dto/create-envirionment.dto';
import { DeleteManyEnvironmentsDto } from './dto/delete-many-environment.dto';

@Controller('environments')
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}
  @Post()
  async create(@Body() data: CreateEnvironmentDTO) {
    return await this.environmentService.create(data);
  }

  @Delete('/reference/:referenceId')
  async remove(
    @Param('referenceId') referenceId: string,
    @Body() data: DeleteManyEnvironmentsDto,
  ) {
    return await this.environmentService.removeManyEnvironments(
      referenceId,
      data,
    );
  }
}
