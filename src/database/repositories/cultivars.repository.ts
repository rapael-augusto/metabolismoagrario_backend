import { PrismaService } from "@db/prisma.service"
import { Injectable } from "@nestjs/common"

interface CreateCultivarDto {
  id: string
  name: string
  cropId: string
}

@Injectable()
export class CultivarsRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateCultivarDto) {
    return await this.prisma.cultivar.create({
      data,
    })
  }

  async findById(id: string) {
    return await this.prisma.cultivar.findUnique({ where: { id }, include: { constants: true } })
  }
}