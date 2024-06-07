import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { CropsRepository } from './repositories/crops.repository';
import { ConstantsRepository } from './repositories/constants.repository';
import { CultivarsRepository } from './repositories/cultivars.repository';

@Module({
  providers: [
    PrismaService,
    UserRepository,
    CropsRepository,
    CultivarsRepository,
    ConstantsRepository,
  ],
  exports: [UserRepository, CropsRepository, CultivarsRepository, ConstantsRepository],
})
export class DatabaseModule { }