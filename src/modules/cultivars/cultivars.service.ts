import { CultivarsRepository } from '@db/repositories/cultivars.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpdateCultivarDto } from './dto/update-cultivar.dto';

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

  async update(cultivarId: string, updateCultivarDto: UpdateCultivarDto) {
    try {
      return await this.cultivarsRepository.update(cultivarId, updateCultivarDto)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async remove(id: string) {
    console.log(`Cultivar com id ${id} removida com sucesso`)
    try {
      return await this.cultivarsRepository.remove(id)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
