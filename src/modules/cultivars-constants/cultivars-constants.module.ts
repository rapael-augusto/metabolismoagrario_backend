import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/prisma.module';
import { CultivarsConstantsController } from './cultivars-constants.controller';
import { CultivarsConstantsService } from './cultivars-constants.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CultivarsConstantsController],
  providers: [CultivarsConstantsService],
  exports: [CultivarsConstantsService],
})
export class CultivarsConstantsModule {}
