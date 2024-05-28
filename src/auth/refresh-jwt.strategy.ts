import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constants";
import { User } from "@/types/index"
import { UserTokenPayload } from "./utils/generate-access-tokens";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: jwtConstants.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: UserTokenPayload) {
    const refreshToken = req.body.refreshToken

    return { id: payload.sub, name: payload.name, email: payload.email, role: payload.role, refreshToken } as User
  }
}
