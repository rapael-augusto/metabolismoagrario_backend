import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/prisma.module';
import { PasswordResetController } from './passsword-reset.controller';
import { PasswordResetService } from './password-reset.service';
import { EmailModule } from '@modules/email/email.module';

@Module({
  imports: [DatabaseModule, EmailModule],
  controllers: [PasswordResetController],
  providers: [PasswordResetService],
})
export class PasswordResetModule {}
