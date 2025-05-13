import { Prisma, ReviewStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCultivarReviewDto } from '@modules/cultivars/dto/create-cultivar-review.dto';
import { UpdateCultivarReviewDto } from '@modules/cultivars/dto/update-cultivar-review.dto';
import { RejectCultivarReviewDTO } from '@modules/cultivars/dto/reject-cultivar-review.dto';

@Injectable()
export class CultivarReviewRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCultivarReviewDto) {
    return await this.prisma.cultivarReview.create({
      data,
    });
  }

  async findOne(
    where: Prisma.CultivarReviewWhereInput,
    include?: Prisma.CultivarReviewInclude,
  ) {
    return await this.prisma.cultivarReview.findFirst({ where, include });
  }

  async findById(id: string, include?: Prisma.CultivarReviewInclude) {
    return await this.prisma.cultivarReview.findUnique({
      where: { id },
      include,
    });
  }

  async findAll(
    where?: Prisma.CultivarReviewWhereInput,
    include?: Prisma.CultivarReviewInclude,
  ) {
    return await this.prisma.cultivarReview.findMany({
      where,
      include,
    });
  }

  async update(id: string, data: UpdateCultivarReviewDto) {
    try {
      return this.prisma.cultivarReview.update({
        data,
        where: {
          id,
        },
      });
    } catch (error) {
      throw new error();
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.cultivarReview.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Cultivar Review com id ${id} não existe`);
    }
  }

  async approveCultivarReview(reviewId: string) {
    // Verifica se o cultivarReview existe e se tem status pendente
    const review = await this.findById(reviewId);
    if (!review) {
      throw new Error('Review not found');
    }
    if (
      review.status !== ReviewStatus.PENDING &&
      review.status !== ReviewStatus.CHANGES_REQUESTED
    ) {
      throw new Error('Only PENDING reviews can be approved');
    }

    // Utiliza transaction pra certificar que ocorrerá como um todo
    return this.prisma.$transaction(async (prisma) => {
      // Atualiza o cultivarReview para APPROVED
      const updatedReview = await prisma.cultivarReview.update({
        where: { id: reviewId },
        data: {
          status: ReviewStatus.APPROVED,
          reviewed_at: new Date(),
        },
      });

      // Atualiza a referencia para APPROVED
      await prisma.reference.update({
        where: { id: review.referenceId },
        data: {
          status: ReviewStatus.APPROVED,
        },
      });

      // Atualiza todas constants para APPROVED
      await prisma.constant.updateMany({
        where: { reviewId: reviewId },
        data: {
          status: ReviewStatus.APPROVED,
        },
      });

      return updatedReview;
    });
  }

  async rejectCultivarReview(reviewId: string, data: RejectCultivarReviewDTO) {
    const { status: rejectedStatus, justification } = data;

    // Verifica se o cultivarReview existe e se tem status pendente
    const review = await this.findById(reviewId);
    if (!review) {
      throw new Error('Review not found');
    }
    if (
      review.status !== ReviewStatus.PENDING &&
      review.status !== ReviewStatus.CHANGES_REQUESTED
    ) {
      throw new Error('Only PENDING reviews can be approved');
    }

    // Utiliza transaction pra certificar que ocorrerá como um todo
    return this.prisma.$transaction(async (prisma) => {
      // Atualiza o cultivarReview para o status de rejeição
      const updatedReview = await prisma.cultivarReview.update({
        where: { id: reviewId },
        data: {
          status: rejectedStatus,
          reviewed_at: new Date(),
          justification,
        },
      });

      // verifica se existem constants com status APPROVED associado à referência (não conta com as desse review)
      const otherApprovedConstants = await prisma.constant.count({
        where: {
          referenceId: review.referenceId,
          status: ReviewStatus.APPROVED,
          NOT: {
            reviewId: reviewId,
          },
        },
      });

      // Atualiza a referencia para o status de rejeição, CASO não possua mais constants
      if (otherApprovedConstants === 0)
        await prisma.reference.update({
          where: { id: review.referenceId },
          data: {
            status: rejectedStatus,
          },
        });

      // Atualiza todas constants para o status de rejeição
      await prisma.constant.updateMany({
        where: { reviewId: reviewId },
        data: {
          status: rejectedStatus,
        },
      });

      return updatedReview;
    });
  }
}
