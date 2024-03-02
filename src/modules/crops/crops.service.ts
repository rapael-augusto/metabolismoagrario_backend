import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { CropsRepository } from '@db/repositories/crops.repository';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CropsService {
  constructor(private cropsRepository: CropsRepository) { }

  async create(createCropDto: CreateCropDto) {
    return await this.cropsRepository.create({
      id: randomUUID(),
      ...createCropDto
    })

  }

  async findAll() {
    return await this.cropsRepository.list()
  }

  async findOne(id: string) {
    const crop = await this.cropsRepository.findById(id)
    if (!crop) throw new NotFoundException("Crop not found")

    return { crop }
  }

  async remove(id: string) {
    return `This action removes a #${id} crop`;
  }
}
