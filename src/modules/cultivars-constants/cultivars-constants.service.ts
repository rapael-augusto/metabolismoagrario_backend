import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCultivarConstantDto } from './dto/create-cultivars-constant.dto';
import { ConstantsRepository } from '@db/repositories/constants.repository';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CultivarsConstantsService {
  constructor(private cultivarsConstantsRepository: ConstantsRepository) { }

  async create(cultivarId: string, createCultivarsConstantDto: CreateCultivarConstantDto) {
    return await this.cultivarsConstantsRepository.create({ id: randomUUID(), cultivarId, ...createCultivarsConstantDto, })
  }

  async remove(id: string) {
    console.log(`Constante ${id} removida com sucesso`)
    try {
      return await this.cultivarsConstantsRepository.remove(id)
    } catch(error) {
      throw new NotFoundException(error)
    }
  }
}
