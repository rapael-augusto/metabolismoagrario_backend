import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { SessionModule } from '@modules/session/session.module';
import { AuthModule } from './auth/auth.module';
import { CropsModule } from '@modules/crops/crops.module';
import { CultivarsModule } from '@modules/cultivars/cultivars.module';
import { CultivarsConstantsModule } from '@modules/cultivars-constants/cultivars-constants.module';
import { DatabaseModule } from './prisma.module'; // Corrigir o nome da importação
import { CustomBiomeModule } from '@modules/biome/custom-biome.module';
import { CustomSoilModule } from '@modules/soil/custom-soil.module';
import { CountriesController } from '@modules/country/country.controller';
import { PasswordResetModule } from '@modules/password-reset/password-reset.module';
import ReferenceModule from '@modules/reference/reference.module';
import EnvironmentModule from '@modules/environment/environment.module';
import { CultivarReviewModule } from '@modules/cultivarReview/cultivarReview.module';

@Module({
  imports: [
    AuthModule,
    SessionModule,
    UsersModule,
    CropsModule,
    CultivarsModule,
    CultivarsConstantsModule,
    PasswordResetModule,
    ReferenceModule,
    EnvironmentModule,
    CultivarReviewModule,
    DatabaseModule, // Usar o nome correto do módulo
  ],
  controllers: [CountriesController],
  providers: [],
})
export class AppModule {}
