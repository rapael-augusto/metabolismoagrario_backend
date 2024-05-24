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
    const crops = await this.cropsRepository.list()
    const groupedCrops = crops.reduce((acc, crop) => {
      const { climate } = crop;
      if (!acc[climate]) {
        acc[climate] = [];
      }
      acc[climate].push(crop);
      return acc;
    }, {} as Record<string, typeof crops>);

    return groupedCrops;
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
