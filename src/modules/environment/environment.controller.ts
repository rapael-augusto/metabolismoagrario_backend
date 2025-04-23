import { Body, Controller, Post } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { CreateEnvironmentDTO } from './dto/create-envirionment.dto';

@Controller('environments')
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}
  @Post()
  async create(@Body() data: CreateEnvironmentDTO) {
    return await this.environmentService.create(data);
  }
}
