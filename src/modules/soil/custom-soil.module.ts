import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/prisma.module";
import { CustomSoilController } from "./custom-soil.controller";
import { CustomSoilService } from "./custom-soil.service";
import { CustomSoilRepository } from "@db/repositories/custom-soil.repository";

@Module({
  imports: [DatabaseModule],
  controllers: [CustomSoilController],
  providers: [CustomSoilService, CustomSoilRepository]
})
export class CustomSoilModule{}