import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { SessionModule } from '@modules/session/session.module';
import { AuthModule } from './auth/auth.module';
import { CropsModule } from "@modules/crops/crops.module";
import { CultivarsModule } from '@modules/cultivars/cultivars.module';
import { CultivarsConstantsModule } from '@modules/cultivars-constants/cultivars-constants.module';
import { BibliographicReferencesModule } from './modules/bibliographic-references/bibliographic-references.module';

@Module({
  imports: [
    AuthModule, 
    SessionModule, 
    UsersModule, 
    CropsModule, 
    CultivarsModule, 
    CultivarsConstantsModule, 
    BibliographicReferencesModule  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
