import { Body, Controller, Get, Post, Delete, Param, NotFoundException, Patch } from '@nestjs/common';
import { CreateCustomSoilDto } from './dto/create-custom-soil.dto';
import { CustomSoilService } from './custom-soil.service';
import { Role } from 'src/auth/decorators/user-role-decorator';
import { UserRoles } from '@prisma/client';
import { PublicRoute } from 'src/auth/decorators/public-route-decorator';
import { UpdateCustomSoilDto } from './dto/update-custom-soil.dto';

@Controller('customSoil')
export class CustomSoilController {
  constructor(private readonly customSoilService: CustomSoilService) {}

  // @Post()
  // @Role(UserRoles.ADMIN)
  // async create(@Body() createCustomSoilDto: CreateCustomSoilDto) {
  //   return await this.customSoilService.create({ ...createCustomSoilDto })
  // }

  // @PublicRoute()
  // @Get()
  // async findAll() {
  //   return await this.customSoilService.findAll()
  // }

  // @PublicRoute()
  // @Get(':id')
  // async findOne(@Param("id") id: string) {
  //   return await this.customSoilService.findOne(id)
  // }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateCustomSoilDto: UpdateCustomSoilDto) {
  //   return await this.customSoilService.update(id, updateCustomSoilDto)
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   try {
  //     return await this.customSoilService.remove(id)
  //   } catch(error) {
  //     throw new NotFoundException(`Solo com id ${id} não xiste`)
  //   }
  // }
}
