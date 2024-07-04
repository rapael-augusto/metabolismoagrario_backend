import { Body, Controller, Delete, NotFoundException, Param, Post } from '@nestjs/common';
import { CultivarsConstantsService } from './cultivars-constants.service';
import { CreateCultivarConstantDto } from './dto/create-cultivars-constant.dto';
import { Role } from 'src/auth/decorators/user-role-decorator';
import { UserRoles } from '@prisma/client';

@Controller('constants')
export class CultivarsConstantsController {
  constructor(private readonly cultivarsConstantsService: CultivarsConstantsService) { }

  @Post(":cultivarId")
  @Role(UserRoles.ADMIN)
  async create(@Param('cultivarId') cultivarId: string, @Body() createCultivarConstantDto: CreateCultivarConstantDto) {
    return await this.cultivarsConstantsService.create(cultivarId, createCultivarConstantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.cultivarsConstantsService.remove(id)
    } catch (error) {
      throw new NotFoundException(`Fator de conversão com ID ${id} não encontrado`)
    }
  }
}
