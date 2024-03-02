import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Crop } from "@prisma/client";


interface CreateCropDto {
  id: string
  name: string
  scientificName: string
}

@Injectable()
export class CropsRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateCropDto) {
    const crops = await this.prisma.crop.create({
      data,
    })

    return crops
  }

  async findById(id: string) {
    return await this.prisma.crop.findUnique({ where: { id }, include: { constants: true } })
  }

  async list() {
    return await this.prisma.crop.findMany()
  }
}