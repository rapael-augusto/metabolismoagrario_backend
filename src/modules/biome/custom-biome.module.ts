import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/prisma.module';
import { CustomBiomeController } from './custom-biome.controller';
import { CustomBiomeService } from './custom-biome.service';
import { CustomBiomeRepository } from '@db/repositories/custom-biome.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomBiomeController],
  providers: [CustomBiomeService, CustomBiomeRepository]
})
export class CustomBiomeModule { }