import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCultivarReviewDto } from '@modules/cultivars/dto/create-cultivar-review.dto';
import { UpdateCultivarReviewDto } from '@modules/cultivars/dto/update-cultivar-review.dto';

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

  async update(
    id: string,
    data: UpdateCultivarReviewDto & { reviewed_at: Date },
  ) {
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
}
