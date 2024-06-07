import { DatabaseModule } from '@db/prisma.module';
import { Module } from '@nestjs/common';
import { CultivarsController } from './cultivars.controller';
import { CultivarsService } from './cultivars.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CultivarsController],
  providers: [CultivarsService]
})
export class CultivarsModule { }
