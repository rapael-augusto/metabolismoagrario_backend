import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User, UserRoles } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user-decorator';
import { PublicRoute } from 'src/auth/decorators/public-route-decorator';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { Role } from 'src/auth/decorators/user-role-decorator';

@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) { }

  @Post()
  @Role(UserRoles.ADMIN)
  async create(@Body() createCropDto: CreateCropDto) {
    return await this.cropsService.create({ ...createCropDto });
  }

  @PublicRoute()
  @Get()
  async findAll() {
    return await this.cropsService.findAll();
  }

  @PublicRoute()
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.cropsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cropsService.remove(id);
  }
}
