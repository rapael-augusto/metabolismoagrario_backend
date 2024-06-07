import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Climates, ConstantTypes, CultivationSystem, IrrigationTypes, } from "@prisma/client";

interface CreateConstantDto {
  id: string
  value: number;
  reference: string;
  comment: string;
  type: ConstantTypes;
  climate: Climates;
  biome: string
  irrigation: IrrigationTypes
  country: string
  cultivationSystem: CultivationSystem
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