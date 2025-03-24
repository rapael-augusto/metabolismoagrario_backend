import { ReferenceRepository } from '@db/repositories/reference.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReferenceDTO } from './dto/create-reference.dto';
import { CultivarsRepository } from '@db/repositories/cultivars.repository';

@Injectable()
export class ReferenceService {
  constructor(
    private readonly referenceRepository: ReferenceRepository,
    private readonly cultivarsRepository: CultivarsRepository,
  ) {}

  async create(data: CreateReferenceDTO) {
    const cultivar = await this.cultivarsRepository.findById(data.cultivarId);
    if (!cultivar) throw new NotFoundException('Nenhuma cultivar encontrada');
    return await this.referenceRepository.create(data);
  }
}
