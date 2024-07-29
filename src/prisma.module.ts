import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './database/repositories/user.repository';
import { CropsRepository } from './database/repositories/crops.repository';
import { ConstantsRepository } from './database/repositories/constants.repository';
import { CultivarsRepository } from './database/repositories/cultivars.repository';
import { BibliographicReferencesRepository } from './database/repositories/bibliographic-references.repository';

@Module({
  providers: [
    PrismaService,
    UserRepository,
    CropsRepository,
    CultivarsRepository,
    ConstantsRepository,
    BibliographicReferencesRepository,
  ],
  exports: [
    PrismaService,
    UserRepository,
    CropsRepository,
    CultivarsRepository,
    ConstantsRepository,
    BibliographicReferencesRepository,
  ],
})
export class DatabaseModule {}
