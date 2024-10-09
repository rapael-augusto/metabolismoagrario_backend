import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { ConstantTypes, CultivationSystem, IrrigationTypes, SoilTypes, } from "@prisma/client";
import { BiomeTypes, ClimatesTypes } from "@/types/index";
import { UpdateCultivarsConstantDto } from "@modules/cultivars-constants/dto/update-cultivars-constant.dto";
4
interface CreateConstantDto {
  id: string
  value: number
  type: ConstantTypes
  comment: string
  climate?: ClimatesTypes
  biome?: BiomeTypes
  irrigation?: IrrigationTypes
  country?: string
  cultivationSystem?: CultivationSystem
  customSoil?: string 
  customBiome?: string
  soil?: SoilTypes
  cultivarId: string
  linkReference: string
}

@Injectable()
export class ConstantsRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateConstantDto) {
    const { country, cultivarId, customSoil, customBiome, ...rest } = data
    // related entities
    let countryRecord = null
    let customSoilRecord = null
    let customBiomeRecord = null

    if (country) {
      countryRecord = await this.prisma.country.findUnique({ where: { nome_pais: country } })
    }

    if (country && !countryRecord) {
      throw new NotFoundException(`Country with name ${country} not found`)
    }

    if (customSoil) {
      customSoilRecord = await this.prisma.customSoilType.findUnique({ where: { id: customSoil } })

      if (!customSoilRecord) {
        throw new NotFoundException(`CustomSoilType with id ${customSoil} not found`)
      }
    }

    if (customBiome) {
      customBiomeRecord = await this.prisma.customBiomeType.findUnique({ where: { id: customBiome } })
      
      if (!customBiomeRecord) {
        throw new NotFoundException(`CustomBiomeType with id ${customBiome} not found`)
      }
    }

    const createData: any = {
      ...rest,
      country: countryRecord ? { connect: { id: countryRecord.id } } : undefined,
      cultivar: { connect: { id: cultivarId } },
      customSoil: customSoilRecord ? { connect: { id: customSoilRecord.id } } : undefined,
      customBiome: customBiomeRecord ? { connect: { id: customBiomeRecord.id } } : undefined,
    }

    return await this.prisma.constant.create({ data: createData })
  }
  
  async update(id: string, data: UpdateCultivarsConstantDto) {
    const { country, customSoil, customBiome, ...rest } = data

    const countryRecord = country ? await this.prisma.country.findUnique({ where: { nome_pais: country } }) : null

    if (country && !countryRecord) {
      throw new NotFoundException(`Country with name ${country} not found`)
    }

    const customSoilRecord = customSoil ? await this.prisma.customSoilType.findUnique({ where: { id: customSoil } }) : null

    if (customSoil && !customSoilRecord) {
      throw new NotFoundException(`CustomSoilType with id ${customSoil} not found`)
    }

    const customBiomeRecord = customBiome ? await this.prisma.customBiomeType.findUnique({ where: { id: customBiome } }) : null

    if (customBiome && !customBiomeRecord) {
      throw new NotFoundException(`CustomBiomeType with id ${customBiome} not found`)
    }

    const updateData: any = {
      ...rest,
      ...(countryRecord && { country: { connect: { id: countryRecord.id } } }),
      ...(customSoilRecord && { customSoil: { connect: { id: customSoilRecord.id } } }),
      ...(customBiomeRecord && { customBiome: { connect: { id: customBiomeRecord.id } } })
    }

    try {
      return await this.prisma.constant.update({ where: { id }, data: updateData })
    } catch (error) {
      throw new Error(`Failed to update constant with id ${id}`)
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.constant.delete({ where: { id } })
    } catch (error) {
      throw new NotFoundException(`Conversion factor with id ${id} does not exist`)
    }
  }
}