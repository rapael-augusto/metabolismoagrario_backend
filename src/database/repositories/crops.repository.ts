import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UpdateCropDto } from '@modules/crops/dto/update-crop.dto';
import { Prisma, ReviewStatus } from '@prisma/client';

export interface CreateCropData {
  id: string;
  name: string;
  scientificName: string;
}

@Injectable()
export class CropsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCropData) {
    const crops = await this.prisma.crop.create({ data });
    return crops;
  }

  async findById(id: string) {
    return await this.prisma.crop.findUnique({
      where: { id },
      include: {
        cultivars: true,
      },
    });
  }

  async listAll() {
    return await this.prisma.crop.findMany();
  }

  async find(where: Prisma.CropWhereInput) {
    return await this.prisma.crop.findFirst({ where });
  }

  async update(id: string, data: UpdateCropDto) {
    console.log({ data });
    try {
      return await this.prisma.crop.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.crop.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Cultura com id: ${id} não existe`);
    }
  }
}
