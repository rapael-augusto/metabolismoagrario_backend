import { PrismaService } from "src/prisma.service"
import { UpdateCultivarDto } from "@modules/cultivars/dto/update-cultivar.dto"
import { Injectable, NotFoundException } from "@nestjs/common"

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

  async update(id: string, data: UpdateCultivarDto) {
    console.log({data})
    try {
      return this.prisma.cultivar.update({
        data, 
        where: {
          id
        }
      })
    } catch (error) {
      throw new error
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.cultivar.delete({ where: { id } })
    } catch (error) {
      throw new NotFoundException(`Cultivar com id ${id} não existe`)
    }
  }
}