import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReferenceService } from './reference.service';
import { CreateFullReferenceDTO } from './dto/create-full-reference.dto';
import { CurrentUser } from 'src/auth/decorators/current-user-decorator';
import { User } from '@prisma/client';
import { Role } from 'src/auth/decorators/user-role-decorator';
import { DeleteManyReferenceDTO } from './dto/delete-many-reference.dto';
import { UpdateReferenceDto } from './dto/update-reference.dto';

@Controller('references')
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Post(':cultivarId')
  async create(
    @Param('cultivarId') cultivarId: string,
    @Body() data: CreateFullReferenceDTO,
    @CurrentUser() user: User,
  ) {
    return this.referenceService.create(cultivarId, data, user);
  }

  @Get('')
  async listTitles() {
    return this.referenceService.listTitles();
  }

  @Delete(':referenceId')
  @Role('ADMIN')
  async remove(@Param('referenceId') referenceId: string) {
    return this.referenceService.remove(referenceId);
  }

  @Delete('')
  @Role('ADMIN')
  async removeMany(@Body() data: DeleteManyReferenceDTO) {
    return this.referenceService.removeMany(data);
  }

  @Put(':referenceId')
  @Role('ADMIN')
  async update(
    @Param('referenceId') referenceId: string,
    @Body() data: UpdateReferenceDto,
  ) {
    return this.referenceService.update(referenceId, data);
  }
}
