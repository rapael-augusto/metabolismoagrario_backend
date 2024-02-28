import { User } from "@/types/index"
import { JwtService } from "@nestjs/jwt"

export interface UserTokenPayload {
  sub: string
  name: string
  email: string
}

export async function generateAccessTokens(user: User, encrypter: JwtService) {
  const encryptionData: UserTokenPayload = {
    sub: user.id, // token subject identifier
    name: user.name,
    email: user.email,
  }

  const [accessToken, refreshToken] = await Promise.all([
    encrypter.signAsync(encryptionData, {
      expiresIn: '1d' // TODO adjust time later
    }),

    encrypter.signAsync(encryptionData, {
      expiresIn: '30d' // TODO adjust time later
    }),
  ])

  return {
    accessToken,
    refreshToken
  }
}