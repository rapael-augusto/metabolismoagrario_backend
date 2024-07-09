import { Body, Controller, Delete, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CultivarsConstantsService } from './cultivars-constants.service';
import { CreateCultivarConstantDto } from './dto/create-cultivars-constant.dto';
import { Role } from 'src/auth/decorators/user-role-decorator';
import { UserRoles } from '@prisma/client';
import { UpdateCultivarsConstantDto } from './dto/update-cultivars-constant.dto';

@Controller('constants')
export class CultivarsConstantsController {
  constructor(private readonly cultivarsConstantsService: CultivarsConstantsService) { }

  @Post(":cultivarId")
  @Role(UserRoles.ADMIN)
  async create(@Param('cultivarId') cultivarId: string, @Body() createCultivarConstantDto: CreateCultivarConstantDto) {
    return await this.cultivarsConstantsService.create(cultivarId, createCultivarConstantDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCultivarsConstantDto: UpdateCultivarsConstantDto) {
    try {
      return await this.cultivarsConstantsService.update(id, updateCultivarsConstantDto)
    } catch (error) {
      throw new error
    }
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.cultivarsConstantsService.remove(id);
    } catch (error) {
      throw new NotFoundException(`Fator de conversão com ID ${id} não encontrado`)
    }
  }

}
