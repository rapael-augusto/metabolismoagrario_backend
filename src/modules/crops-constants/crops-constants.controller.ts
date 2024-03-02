import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CropsConstantsService } from './crops-constants.service';
import { CreateCropsConstantsDto } from './dto/create-crops-constant.dto';

@Controller('constants')
export class CropsConstantsController {
  constructor(private readonly cropsConstantsService: CropsConstantsService) { }

  @Post(":cropId")
  async create(@Param('cropId') cropId: string, @Body() createCropsConstantsDto: CreateCropsConstantsDto) {
    await this.cropsConstantsService.create(cropId, createCropsConstantsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cropsConstantsService.remove(id);
  }
}
