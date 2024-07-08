import { Injectable, NotFoundException } from '@nestjs/common';
import { BibliographicReferencesRepository } from '../../database/repositories/bibliographic-references.repository';
import { Prisma, BibliographicReference } from '@prisma/client';
import { PrismaService } from '@db/prisma.service';


@Injectable()
export class BibliographicReferencesService {
  constructor(private prisma: PrismaService) {}
  create(data: Prisma.BibliographicReferenceCreateInput): Promise<BibliographicReference> {
    return this.prisma.bibliographicReference.create({data});
  }

  findAll(): Promise<BibliographicReference[]> {
    return this.prisma.bibliographicReference.findMany();
  }
  
  async findOne(id: string) {
    const bibli = await this.prisma.bibliographicReference.findUnique({ where: { id } });
    if (!bibli) {
      throw new NotFoundException("Bibliographic com ID: ${id}, não encontrado!");
    }
    return bibli;
  }

  update(id: string, data: Prisma.BibliographicReferenceUpdateInput): Promise<BibliographicReference> {
    return this.prisma.bibliographicReference.update({where: { id }, data});
  }

  remove(id: string): Promise<BibliographicReference> {
    return this.prisma.bibliographicReference.delete({where:  {id} });
  }
}
