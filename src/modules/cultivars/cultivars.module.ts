import { DatabaseModule } from 'src/prisma.module';
import { Module } from '@nestjs/common';
import { CultivarsController } from './cultivars.controller';
import { CultivarsService } from './cultivars.service';
import { EmailModule } from '@modules/email/email.module';

@Module({
  imports: [DatabaseModule, EmailModule],
  controllers: [CultivarsController],
  providers: [CultivarsService],
})
export class CultivarsModule {}
