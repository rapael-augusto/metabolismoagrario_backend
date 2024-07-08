import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, BibliographicReference } from '@prisma/client';

@Injectable()
export class BibliographicReferencesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.BibliographicReferenceCreateInput,
  ): Promise<BibliographicReference> {
    return this.prisma.bibliographicReference.create({
      data,
    });
  }

  async findAll(): Promise<BibliographicReference[]> {
    return this.prisma.bibliographicReference.findMany();
  }

  async findById(id: string) {
    return await this.prisma.bibliographicReference.findUnique({ where: { id } })
  }


  async findOne(id: string): Promise<BibliographicReference | null> {
    return this.prisma.bibliographicReference.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.BibliographicReferenceUpdateInput): Promise<BibliographicReference> {
    return this.prisma.bibliographicReference.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<BibliographicReference> {
    return this.prisma.bibliographicReference.delete({
      where: { id },
    });
  }
}
export { BibliographicReference };

