import { EmailModule } from '@modules/email/email.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/prisma.module';
import { CultivarReviewController } from './cultivarReview.controller';
import { CultivarReviewService } from './cultivarReview.service';
import ReferenceModule from '@modules/reference/reference.module';
import { CultivarsConstantsModule } from '@modules/cultivars-constants/cultivars-constants.module';

@Module({
  imports: [
    DatabaseModule,
    EmailModule,
    ReferenceModule,
    CultivarsConstantsModule,
  ],
  controllers: [CultivarReviewController],
  providers: [CultivarReviewService],
})
export class CultivarReviewModule {}
