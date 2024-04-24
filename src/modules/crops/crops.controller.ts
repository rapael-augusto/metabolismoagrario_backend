import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { PublicRoute } from 'src/auth/decorators/public-route-decorator';

@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) { }

  @Post()
  async create(@Body() createCropDto: CreateCropDto) {
    return await this.cropsService.create(createCropDto);
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
