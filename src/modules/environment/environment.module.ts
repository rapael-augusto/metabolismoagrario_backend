import { Module } from '@nestjs/common';
import { EnvironmentController } from './environment.controller';
import { EnvironmentService } from './environment.service';
import { DatabaseModule } from 'src/prisma.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EnvironmentController],
  providers: [EnvironmentService],
})
export default class EnvironmentModule {}
