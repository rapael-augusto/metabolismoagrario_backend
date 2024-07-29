import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ConstantTypes, IrrigationTypes, CultivationSystem, SoilTypes } from '@prisma/client';

@Controller('constant')
export class ConstantController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async createConstantWithSoil(@Body() data: {
    value: number;
    reference: string;
    type: ConstantTypes;
    comment?: string;
    climate?: string;
    biome?: string;
    irrigation?: IrrigationTypes;
    country?: string;
    soil?: SoilTypes;
    cultivationSystem?: CultivationSystem;
    customSoilId?: string;
    cultivarId: string;
    bibliographicReferenceId?: number; 
  }) {
    try {
      const constant = await this.prismaService.constant.create({
        data: {
          ...data,
        },
      });
      return constant;
    } catch (error) {
      throw new Error('Error creating constant');
    }
  }
}
