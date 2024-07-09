import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ConstantTypes, CultivationSystem, IrrigationTypes, SoilTypes, } from "@prisma/client";
import { BiomeTypes, ClimatesTypes } from "@/types/index";
import { UpdateCultivarsConstantDto } from "@modules/cultivars-constants/dto/update-cultivars-constant.dto";

interface CreateConstantDto {
  id: string
  value: number;
  reference: string;
  type: ConstantTypes;
  comment: string;
  climate?: ClimatesTypes;
  biome?: BiomeTypes
  irrigation?: IrrigationTypes
  country?: string
  cultivationSystem?: CultivationSystem
  soil?: SoilTypes
  cultivarId: string
}

@Injectable()
export class ConstantsRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateConstantDto) {
    return await this.prisma.constant.create({
      data,
    })
  }

  async update(id: string, data: UpdateCultivarsConstantDto) {
    console.log({data})
    try {
      return this.prisma.constant.update({
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
      return await this.prisma.constant.delete({ where: { id } })
    } catch (error) {
      throw new NotFoundException(`Fator de conversão com id ${id} não existe`)
    }
  }
}