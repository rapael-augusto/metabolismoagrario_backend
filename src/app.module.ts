import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { SessionModule } from '@modules/session/session.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, SessionModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
