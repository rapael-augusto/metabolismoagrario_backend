import { User } from "@/types/index"
import { JwtService } from "@nestjs/jwt"
import { UserRoles } from "@prisma/client"

export interface UserTokenPayload {
  sub: string
  name: string
  email: string
  role: UserRoles
}

export async function generateAccessTokens(user: User, encrypter: JwtService) {
  const encryptionData: UserTokenPayload = {
    sub: user.id, // token subject identifier
    name: user.name,
    email: user.email,
    role: user.role,
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