import { User } from "@/types/index";
import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/auth/decorators/current-user-decorator";
import { PublicRoute } from "src/auth/decorators/public-route-decorator";
import { RefreshJwtGuard } from "src/auth/refresh-jwt-auth.guard";
import { SessionService } from "./session.service";


@Controller('sessions')
export class SessionController {
  constructor(private sessionService: SessionService) { }

  @PublicRoute()
  @Post()
  async login(@Body() body: any) {
    const { user, accessToken, refreshToken } = await this.sessionService.authenticateUser(body)

    return { user, accessToken, refreshToken }
  }

  @Post('/:id/sign-out')
  async signOut(@Param("id") id: string) {
    await this.sessionService.signOutUser(id)
  }

  @PublicRoute() // so that we don't use the default JWT Guard
  @UseGuards(RefreshJwtGuard)
  @Post('/refresh-token')
  async refreshToken(@CurrentUser() user: User) {
    const tokens = await this.sessionService.refreshAccessToken({ userId: user.id, refreshToken: user.refreshToken! });

    return tokens
  }

}