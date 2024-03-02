import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { CropsRepository } from './repositories/crops.repository';
import { ConstantsRepository } from './repositories/constants.repository';

@Module({
  providers: [
    PrismaService,
    UserRepository,
    CropsRepository,
    ConstantsRepository,
  ],
  exports: [UserRepository, CropsRepository, ConstantsRepository],
})
export class DatabaseModule { }