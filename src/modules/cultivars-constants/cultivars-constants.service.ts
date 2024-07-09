import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCultivarConstantDto } from './dto/create-cultivars-constant.dto';
import { ConstantsRepository } from '@db/repositories/constants.repository';
import { randomUUID } from 'node:crypto';
import { UpdateCultivarsConstantDto } from './dto/update-cultivars-constant.dto';

@Injectable()
export class CultivarsConstantsService {
  constructor(private cultivarsConstantsRepository: ConstantsRepository) { }

  async create(cultivarId: string, createCultivarsConstantDto: CreateCultivarConstantDto) {
    return await this.cultivarsConstantsRepository.create({ id: randomUUID(), cultivarId, ...createCultivarsConstantDto, })
  }

  
  async update(cultivarId: string, updateCultivarsConstantDto: UpdateCultivarsConstantDto) {
    try {
      return await this.cultivarsConstantsRepository.update(cultivarId, updateCultivarsConstantDto)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
  
  async remove(id: string) {
    console.log(`Fator de conversão ${id} removido com sucesso`)
    try {
      return await this.cultivarsConstantsRepository.remove(id)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

}
