import { UpdateCustomSoilDto } from "@modules/soil/dto/update-custom-soil.dto"
import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"

export interface CreateCustomSoilData {
  id: string
  name: string
}

@Injectable()
export class CustomSoilRepository {
  constructor(private prisma: PrismaService) {}

  // async create(data: CreateCustomSoilData) {
  //   const soil = this.prisma.customSoilType.create({ data })
  //   return soil
  // }

  // async findById(id: string) {
  //   return this.prisma.customSoilType.findUnique({ where: { id } })
  // }

  // async findAll() {
  //   return this.prisma.customSoilType.findMany()
  // }

  // async update(id: string, data: UpdateCustomSoilDto) {
  //   return this.prisma.customSoilType.update({ where: {id}, data })
  // }

  // async remove(id: string) {
  //   try {
  //     return this.prisma.customSoilType.delete({ where: {id} })
  //   } catch(error) {
  //     throw new NotFoundException(`Solo com id ${id} não existe`)
  //   }
  // }
}