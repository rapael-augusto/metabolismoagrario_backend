import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ConstantTypes, CultivationSystem, IrrigationTypes, SoilTypes, } from "@prisma/client";
import { BiomeTypes, ClimatesTypes } from "@/types/index";

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
}