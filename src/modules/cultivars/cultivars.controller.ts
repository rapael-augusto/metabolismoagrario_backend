import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserRoles } from '@prisma/client';
import { Role } from 'src/auth/decorators/user-role-decorator';
import { CultivarsService } from './cultivars.service';
import { CreateCultivarDto } from './dto/create-cultivar.dto';
import { PublicRoute } from 'src/auth/decorators/public-route-decorator';

@Controller('cultivars')
export class CultivarsController {
  constructor(private readonly cultivarsService: CultivarsService) { }

  @Post(':cropId')
  @Role(UserRoles.ADMIN)
  async create(@Param('cropId') cropId: string, @Body() createCultivarDto: CreateCultivarDto) {
    return await this.cultivarsService.create({ ...createCultivarDto, cropId });
  }

  @PublicRoute()
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.cultivarsService.findOne(id);
  }
}
