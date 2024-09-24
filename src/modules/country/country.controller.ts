import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Controller('countries')
export class CountriesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll() {
    const countries = await this.prisma.country.findMany({
      select: { nome_pais: true }
    })

    return countries
  }
}