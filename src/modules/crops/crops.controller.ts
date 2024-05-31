import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User, UserRoles } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user-decorator';
import { PublicRoute } from 'src/auth/decorators/public-route-decorator';
import { Role } from 'src/auth/decorators/user-role-decorator';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { ReviewCropDto } from './dto/review-crop.dto';

@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) { }

  @Post()
  async create(@Body() createCropDto: CreateCropDto, @CurrentUser() user: User) {
    return await this.cropsService.create({ ...createCropDto, user });
  }

  @Post(':id/review')
  @Role(UserRoles.ADMIN)
  async review(@Param('id') id: string, @Body() body: ReviewCropDto, @CurrentUser() user: User) {
    return await this.cropsService.review({ id, status: body.status, userId: user.id });
  }

  @PublicRoute()
  @Get()
  async findAll() {
    return await this.cropsService.findAll();
  }

  @Get('/pending')
  async findAllPending() {
    return await this.cropsService.findAllPending();
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
