import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstants } from "./constants";
import { UserTokenPayload } from "./utils/generate-access-tokens";
import { User } from "../@types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.jwtSecret,
    })
  }

  async validate(payload: UserTokenPayload): Promise<User> {
    return { id: payload.sub, name: payload.name, email: payload.email, } as User
  }
}