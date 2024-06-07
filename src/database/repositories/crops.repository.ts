import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";


export interface CreateCropData {
  id: string
  name: string
  scientificName: string
}

@Injectable()
export class CropsRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateCropData) {
    const crops = await this.prisma.crop.create({
      data,
    })

    return crops
  }

  async findById(id: string) {
    return await this.prisma.crop.findUnique({ where: { id }, include: { cultivars: true } })
  }

  async listAll() {
    return await this.prisma.crop.findMany()
  }
}