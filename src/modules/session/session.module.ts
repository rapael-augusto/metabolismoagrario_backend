import { DatabaseModule } from "src/prisma.module";
import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { SessionController } from "./session-controller";
import { SessionService } from "./session.service";


@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [SessionService,],
  controllers: [SessionController]
})
export class SessionModule { } 