import { CultivarsRepository } from '@db/repositories/cultivars.repository';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCultivarDto } from './dto/update-cultivar.dto';
import { CreateCultivarDto } from './dto/create-cultivar.dto';
import { Prisma, ReviewStatus, User } from '@prisma/client';
import { CultivarReviewRepository } from '@db/repositories/cultivarReview.repository';
import { UpdateCultivarReviewDto } from './dto/update-cultivar-review.dto';
import { ReferenceRepository } from '@db/repositories/reference.repository';
import { ConstantsRepository } from '@db/repositories/constants.repository';
import { RejectCultivarReviewDTO } from './dto/reject-cultivar-review.dto';

@Injectable()
export class CultivarsService {
  constructor(
    private constantsRepository: ConstantsRepository,
    private cultivarsRepository: CultivarsRepository,
    private cultivarsReviewRepository: CultivarReviewRepository,
    private referenceRepository: ReferenceRepository,
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
      return;
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
      status: ReviewStatus.PENDING,
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
    const orderBy: Prisma.CultivarReviewOrderByWithRelationInput = {
      reviewed_at: 'desc' as const,
    };

    const include = {
      Cultivar: {
        include: {
          crop: {
            select: {
              name: true,
              scientificName: true,
            },
          },
        },
      },
      reference: true,
      Constants:
        user.role === 'ADMIN'
          ? {
              where: {
                status: ReviewStatus.PENDING,
              },
            }
          : true,
      Environment: {
        include: {
          country: {
            select: {
              nome_pais: true,
            },
          },
        },
      },
      requestedBy: {
        select: {
          name: true,
          email: true,
        },
      },
    };

    if (user.role === 'ADMIN') {
      return this.cultivarsReviewRepository.findAll(
        {
          status: ReviewStatus.PENDING,
        },
        include,
        orderBy,
      );
    }

    return this.cultivarsReviewRepository.findAll(
      {
        userId: user.id,
      },
      include,
      orderBy,
    );
  }

  async approveReview(reviewId: string) {
    try {
      return await this.cultivarsReviewRepository.approveCultivarReview(
        reviewId,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async rejectReview(reviewId: string, data: RejectCultivarReviewDTO) {
    try {
      return await this.cultivarsReviewRepository.rejectCultivarReview(
        reviewId,
        data,
      );
    } catch (error) {}
  }
}
