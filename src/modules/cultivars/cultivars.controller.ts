import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User, UserRoles } from '@prisma/client';
import { Role } from 'src/auth/decorators/user-role-decorator';
import { CultivarsService } from './cultivars.service';
import { CreateCultivarDto } from './dto/create-cultivar.dto';
import { PublicRoute } from 'src/auth/decorators/public-route-decorator';
import { UpdateCultivarDto } from './dto/update-cultivar.dto';
import { CurrentUser } from 'src/auth/decorators/current-user-decorator';

@Controller('cultivars')
export class CultivarsController {
  constructor(private readonly cultivarsService: CultivarsService) {}

  @Post(':cropId')
  @Role(UserRoles.ADMIN)
  async create(
    @Param('cropId') cropId: string,
    @Body() createCultivarDto: CreateCultivarDto,
  ) {
    return await this.cultivarsService.create(cropId, { ...createCultivarDto });
  }

  @PublicRoute()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cultivarsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCultivarDto: UpdateCultivarDto,
    @CurrentUser() user: User,
  ) {
    try {
      return await this.cultivarsService.update(id, updateCultivarDto, user);
    } catch (error) {
      throw new error();
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.cultivarsService.remove(id);
    } catch (error) {
      throw new NotFoundException(`Cultivar com id ${id} não existe`);
    }
  }
}
