import { CultivarsRepository } from '@db/repositories/cultivars.repository';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

interface CreateCultivarRequest {
  name: string
  cropId: string
}

@Injectable()
export class CultivarsService {
  constructor(private cultivarsRepository: CultivarsRepository) { }

  async create(request: CreateCultivarRequest) {
    return await this.cultivarsRepository.create({ id: randomUUID(), ...request })
  }

  async findOne(id: string) {
    return await this.cultivarsRepository.findById(id)
  }

}
