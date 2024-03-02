import { Module } from '@nestjs/common';
import { CropsConstantsService } from './crops-constants.service';
import { CropsConstantsController } from './crops-constants.controller';
import { DatabaseModule } from '@db/prisma.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CropsConstantsController],
  providers: [CropsConstantsService]
})
export class CropsConstantsModule { }
