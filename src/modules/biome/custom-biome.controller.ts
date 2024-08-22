import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CustomBiomeService } from "./custom-biome.service";
import { Role } from "src/auth/decorators/user-role-decorator";
import { UserRoles } from "@prisma/client";
import { CreateCustomBiomeDto } from "./dto/create-custom-biome.dto";
import { PublicRoute } from "src/auth/decorators/public-route-decorator";
import { UpdateCustomBiomeDto } from "./dto/update-custom-biome.dto";

@Controller('customBiome')
export class CustomBiomeController {
  constructor(private readonly customBiomeService: CustomBiomeService) {}

  @Post()
  @Role(UserRoles.ADMIN)
  async create(@Body() createCustomBiomeDto: CreateCustomBiomeDto) {
    return await this.customBiomeService.create({ ...createCustomBiomeDto })
  }

  @PublicRoute()
  @Get()
  async findAll() {
    return await this.customBiomeService.findAll()
  }

  @PublicRoute()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log("ID recebido no findOne:", id)
    return await this.customBiomeService.findOne(id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCustomBiomeDto: UpdateCustomBiomeDto) {
    return await this.customBiomeService.update(id, updateCustomBiomeDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.customBiomeService.remove(id)
  }
}