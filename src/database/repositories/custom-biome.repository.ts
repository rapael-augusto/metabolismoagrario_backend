import { UpdateCustomBiomeDto } from "@modules/biome/dto/update-custom-biome.dto"
import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../prisma.service"

export interface CreateCustomBiomeData {
  id: string
  name: string
}

@Injectable()
export class CustomBiomeRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCustomBiomeData) {
    const biome = await this.prisma.customBiomeType.create({ data })
    return biome
  }

  async findOne(id: string) {
    return await this.prisma.customBiomeType.findUnique({ where: { id } })
  }

  async findAll() {
    return await this.prisma.customBiomeType.findMany()
  }

  async update(id: string, data: UpdateCustomBiomeDto) {
    return await this.prisma.customBiomeType.update({ where: { id }, data })
  }

  async remove(id: string) {
    try {
      return await this.prisma.customBiomeType.delete({ where: { id } })
    } catch (error) {
      throw new NotFoundException(`Bioma com id: ${id} não existe`)
    }
  }
}