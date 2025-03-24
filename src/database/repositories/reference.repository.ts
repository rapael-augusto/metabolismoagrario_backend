import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReferenceDTO } from '@modules/reference/dto/create-reference.dto';
import { UpdateReferenceDto } from '@modules/reference/dto/update-reference.dto';

@Injectable()
export class ReferenceRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReferenceDTO) {
    const { cultivarId, ...referenceData } = data;

    return await this.prisma.$transaction(async (prisma) => {
      const reference = await prisma.reference.create({
        data: referenceData,
      });

      await prisma.cultivarReference.create({
        data: {
          cultivarId,
          referenceId: reference.id,
        },
      });

      return reference;
    });
  }

  async findOne(
    where: Prisma.ReferenceWhereInput,
    include?: Prisma.ReferenceInclude,
  ) {
    return await this.prisma.reference.findFirst({ where, include });
  }

  async findById(id: string, include?: Prisma.ReferenceInclude) {
    return await this.prisma.reference.findUnique({
      where: { id },
      include,
    });
  }

  async findAll(
    where?: Prisma.ReferenceWhereInput,
    include?: Prisma.ReferenceInclude,
  ) {
    return await this.prisma.reference.findMany({
      where,
      include,
    });
  }

  async update(id: string, data: UpdateReferenceDto) {
    try {
      return this.prisma.reference.update({
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
      return await this.prisma.reference.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Reference com id ${id} não existe`);
    }
  }
}
