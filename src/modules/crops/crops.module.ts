import { Module } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CropsController } from './crops.controller';
import { DatabaseModule } from '@db/prisma.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CropsController],
  providers: [CropsService]
})
export class CropsModule { }
