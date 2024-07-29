import { Body, Controller, Get, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Controller('customSoil')
export class CustomSoilController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async createCustomSoil(@Body('name') name: string) {
    try {
      const customSoil = await this.prismaService.customSoilType.create({
        data: { name },
      });
      return customSoil;
    } catch (error) {
      throw new Error('Error creating custom soil type');
    }
  }

  @Get()
  async findAll() {
    try {
      const customSoils = await this.prismaService.customSoilType.findMany();
      return customSoils;
    } catch (error) {
      throw new Error('Error fetching custom soil types');
    }
  }

  @Delete(':id')
  async deleteCustomSoil(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedSoil = await this.prismaService.customSoilType.delete({
        where: { id: id.toString() },
      });
      return deletedSoil;
    } catch (error) {
      throw new Error('Error deleting custom soil type');
    }
  }
}
