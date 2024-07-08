import { Module } from '@nestjs/common';
import { BibliographicReferencesService } from './bibliographic-references.service';
import { BibliographicReferencesController } from './bibliographic-references.controller';
import { BibliographicReferencesRepository } from '../../database/repositories/bibliographic-references.repository';
import { PrismaService } from '../../database/prisma.service';
import { DatabaseModule } from '@db/prisma.module';


@Module({
  imports: [DatabaseModule],
  controllers: [BibliographicReferencesController],
  providers: [BibliographicReferencesService, BibliographicReferencesRepository, PrismaService],
})
export class BibliographicReferencesModule {}
