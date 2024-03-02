import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';

@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) { }

  @Post()
  async create(@Body() createCropDto: CreateCropDto) {
    return await this.cropsService.create(createCropDto);
  }

  @Get()
  async findAll() {
    return await this.cropsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.cropsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cropsService.remove(id);
  }
}
