import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, BibliographicReference } from '@prisma/client';

@Injectable()
export class BibliographicReferencesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.BibliographicReferenceCreateInput): Promise<BibliographicReference> {
    return this.prisma.bibliographicReference.create({ data });
  }

  async findAll(): Promise<BibliographicReference[]> {
    return this.prisma.bibliographicReference.findMany();
  }

  async findOne(id: number): Promise<BibliographicReference | null> {
    return this.prisma.bibliographicReference.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.BibliographicReferenceUpdateInput): Promise<BibliographicReference> {
    return this.prisma.bibliographicReference.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<BibliographicReference> {
    return this.prisma.bibliographicReference.delete({
      where: { id },
    });
  }
}
