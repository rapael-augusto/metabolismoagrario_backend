import { Body, Controller, Post } from '@nestjs/common';
import { ReferenceService } from './reference.service';
import { CreateReferenceDTO } from './dto/create-reference.dto';

@Controller('references')
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Post()
  async create(@Body() data: CreateReferenceDTO) {
    return this.referenceService.create(data);
  }
}
