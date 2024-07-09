import { CreateCropData, CropsRepository } from '@db/repositories/crops.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@Injectable()
export class CropsService {
  constructor(private cropsRepository: CropsRepository) { }

  async create(request: CreateCropDto) {
    const createCropData: CreateCropData = {
      id: randomUUID(),
      name: request.name,
      scientificName: request.scientificName,
    }

    return await this.cropsRepository.create(createCropData)
  }

  async findAll() {
    const crops = await this.cropsRepository.listAll()

    return crops;
  }

  async findOne(id: string) {
    const crop = await this.cropsRepository.findById(id)
    if (!crop) throw new NotFoundException("Crop not found")

    return { crop }
  }

  async update(id: string, updateCropDto: UpdateCropDto) {
    try {
      return await this.cropsRepository.update(id, updateCropDto)
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    console.log(`Cultura com id ${id} removida com sucesso`)
    try {
      return await this.cropsRepository.remove(id)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
