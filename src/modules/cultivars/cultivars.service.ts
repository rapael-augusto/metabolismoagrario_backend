import { CultivarsRepository } from '@db/repositories/cultivars.repository';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCultivarDto } from './dto/update-cultivar.dto';
import { CreateCultivarDto } from './dto/create-cultivar.dto';
import { User } from '@prisma/client';
import { CultivarReviewRepository } from '@db/repositories/cultivarReview.repository';
import { randomUUID } from 'crypto';
import { UpdateCultivarReviewDto } from './dto/update-cultivar-review.dto';

@Injectable()
export class CultivarsService {
  constructor(
    private cultivarsRepository: CultivarsRepository,
    private cultivarsReviewRepository: CultivarReviewRepository,
  ) {}

  async create(cropId: string, request: CreateCultivarDto) {
    try {
      const { name } = request;
      return await this.cultivarsRepository.create({ name, cropId });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    return await this.cultivarsRepository.findById(id);
  }

  async update(cultivarId: string, updateCultivarDto: UpdateCultivarDto) {
    try {
      return await this.cultivarsRepository.update(
        cultivarId,
        updateCultivarDto,
      );
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async remove(id: string) {
    console.log(`Cultivar com id ${id} removida com sucesso`);
    try {
      return await this.cultivarsRepository.remove(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async createReview(cropId: string, data: CreateCultivarDto, user: User) {
    const { id: userId } = user;
    const { id: cultivarId } = await this.create(cropId, data);
    try {
      return await this.cultivarsReviewRepository.create({
        id: randomUUID(),
        userId,
        cultivarId,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateReview(reviewId: string, data: UpdateCultivarReviewDto) {
    const existingReview = await this.cultivarsReviewRepository.findById(
      reviewId,
    );
    if (!existingReview) throw new NotFoundException('Review não encontrada!');
    if (existingReview.reviewed_at != null)
      throw new ConflictException('Essa solicitação já foi revisada!');
    const updatedData = { ...data, reviewed_at: new Date() };
    try {
      return await this.cultivarsReviewRepository.update(reviewId, updatedData);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateCultivarByReview(
    reviewId: string,
    data: UpdateCultivarDto,
    user: User,
  ) {
    const existingReview = await this.cultivarsReviewRepository.findOne({
      id: reviewId,
      userId: user.id,
      status: 'Pending',
    });
    if (!existingReview)
      throw new NotFoundException('Review não pode ser alterada!');
    try {
      return await this.cultivarsRepository.update(
        existingReview.cultivarId,
        data,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async removeCultivarReview(reviewId: string, user: User) {
    const existingReview = await this.cultivarsReviewRepository.findOne({
      id: reviewId,
      userId: user.id,
    });
    if (!existingReview) throw new NotFoundException('Review não encontrada!');
    try {
      return await this.cultivarsReviewRepository.remove(existingReview.id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async listReviews(user: User) {
    if (user.role === 'ADMIN') {
      return this.cultivarsReviewRepository.findAll(
        { status: 'Pending' },
        {
          Cultivar: true,
          requestedBy: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      );
    }
    return this.cultivarsReviewRepository.findAll(
      { userId: user.id },
      {
        Cultivar: true,
        requestedBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    );
  }
}
