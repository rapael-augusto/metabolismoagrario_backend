import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import {
  ConstantTypes,
  CultivationSystem,
  IrrigationTypes,
  Prisma,
  SoilTypes,
} from '@prisma/client';
import { BiomeTypes, ClimatesTypes } from '@/types/index';
import { UpdateCultivarsConstantDto } from '@modules/cultivars-constants/dto/update-cultivars-constant.dto';
import { CreateCultivarConstantDto } from '@modules/cultivars-constants/dto/create-cultivars-constant.dto';
import { CreateManyCultivarConstantsDTO } from '@modules/cultivars-constants/dto/create-many-cultivars-constants.dto';
4;

@Injectable()
export class ConstantsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCultivarConstantDto & { cultivarId: string }) {
    return await this.prisma.constant.create({ data });
  }

  async createMany(data: CreateManyCultivarConstantsDTO, cultivarId: string) {
    const { referenceId, environmentId, constants } = data;
    return await this.prisma.constant.createManyAndReturn({
      data: constants.map((constant) => ({
        ...constant,
        referenceId,
        environmentId,
        cultivarId,
      })),
    });
  }

  async update(id: string, data: UpdateCultivarsConstantDto) {
    try {
      return await this.prisma.constant.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      throw new Error(`Failed to update constant with id ${id}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.constant.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Fator de conversão com id ${id} não existe`);
    }
  }

  async removeMany(where: Prisma.ConstantWhereInput) {
    return await this.prisma.constant.deleteMany({ where });
  }
}
