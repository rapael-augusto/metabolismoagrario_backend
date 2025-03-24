import { Injectable, NotFoundException } from '@nestjs/common';
import { EnvironmentRepository } from '@db/repositories/environment.repository';
import { CreateEnvironmentDTO } from './dto/create-envirionment.dto';

@Injectable()
export class EnvironmentService {
  constructor(private readonly environmentRepository: EnvironmentRepository) {}

  async create(data: CreateEnvironmentDTO) {
    return await this.environmentRepository.create(data);
  }

  async findById(id: string) {
    const environment = await this.environmentRepository.findById(id);
    if (!environment) {
      throw new NotFoundException(`Environment com ID ${id} não encontrado.`);
    }
    return environment;
  }

  async remove(id: string) {
    const environment = await this.environmentRepository.findById(id);
    if (!environment) {
      throw new NotFoundException(`Environment com ID ${id} não encontrado.`);
    }
    return await this.environmentRepository.remove(id);
  }
}
