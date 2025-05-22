import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReferenceService } from './reference.service';
import { CreateFullReferenceDTO } from './dto/create-full-reference.dto';
import { CurrentUser } from 'src/auth/decorators/current-user-decorator';
import { User } from '@prisma/client';

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
}
