import { Module } from '@nestjs/common';
import { DatabaseModule } from '@db/prisma.module';
import { CultivarsConstantsController } from './cultivars-constants.controller';
import { CultivarsConstantsService } from './cultivars-constants.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CultivarsConstantsController],
  providers: [CultivarsConstantsService]
})
export class CultivarsConstantsModule { }
