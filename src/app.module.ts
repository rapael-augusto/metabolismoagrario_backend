import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { SessionModule } from '@modules/session/session.module';
import { AuthModule } from './auth/auth.module';
import { CropsModule } from "@modules/crops/crops.module";
import { CropsConstantsModule } from '@modules/crops-constants/crops-constants.module';


@Module({
  imports: [AuthModule, SessionModule, UsersModule, CropsModule, CropsConstantsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
