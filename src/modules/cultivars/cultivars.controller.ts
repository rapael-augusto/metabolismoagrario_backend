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
import { CultivarsService } from './cultivars.service';
import { CreateCultivarDto } from './dto/create-cultivar.dto';
import { PublicRoute } from 'src/auth/decorators/public-route-decorator';
import { UpdateCultivarDto } from './dto/update-cultivar.dto';
import { Role } from 'src/auth/decorators/user-role-decorator';
import { CurrentUser } from 'src/auth/decorators/current-user-decorator';
import { User } from '@prisma/client';
import { UpdateCultivarReviewDto } from './dto/update-cultivar-review.dto';

@Controller('cultivars')
export class CultivarsController {
  constructor(private readonly cultivarsService: CultivarsService) {}

  @Post(':cropId')
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

  @Role('ADMIN')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCultivarDto: UpdateCultivarDto,
  ) {
    try {
      return await this.cultivarsService.update(id, updateCultivarDto);
    } catch (error) {
      throw new error();
    }
  }

  @Role('ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.cultivarsService.remove(id);
    } catch (error) {
      throw new NotFoundException(`Cultivar com id ${id} não existe`);
    }
  }

  @Get('/review/list')
  async listReviews(@CurrentUser() user: User) {
    return await this.cultivarsService.listReviews(user);
  }

  @Post('/review/:cropId')
  async createReview(
    @Param('cropId') cropId: string,
    @Body() createCultivarDto: CreateCultivarDto,
    @CurrentUser() user: User,
  ) {
    return await this.cultivarsService.createReview(
      cropId,
      createCultivarDto,
      user,
    );
  }

  @Role('ADMIN')
  @Patch('/review/update/:reviewId')
  async updateReview(
    @Param('reviewId') reviewId: string,
    @Body() updateCultivarReviewDto: UpdateCultivarReviewDto,
  ) {
    return await this.cultivarsService.updateReview(
      reviewId,
      updateCultivarReviewDto,
    );
  }

  @Patch('/review/updateCultivar/:reviewId')
  async updateCultivarByReview(
    @Param('reviewId') reviewId: string,
    @Body() updateCultivarDto: UpdateCultivarDto,
    @CurrentUser() user: User,
  ) {
    return await this.cultivarsService.updateCultivarByReview(
      reviewId,
      updateCultivarDto,
      user,
    );
  }

  @Delete('/review/:reviewId')
  async removeCultivarReview(
    @Param('reviewId') reviewId: string,
    @CurrentUser() user: User,
  ) {
    return await this.cultivarsService.removeCultivarReview(reviewId, user);
  }
}
