import { UserRepository } from "@db/repositories/user.repository";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare as bcryptCompare, hash as bcryptHash } from 'bcrypt'
import { generateAccessTokens } from "src/auth/utils/generate-access-tokens";


@Injectable()
export class SessionService {
  constructor(private userRepository: UserRepository, private encrypter: JwtService) { }

  async authenticateUser(request: { email: string, password: string }) {
    const user = await this.userRepository.findByEmail(request.email)

    if (!user) {
      throw new NotFoundException("User not found")
    }

    const isPasswordValid = await bcryptCompare(
      request.password,
      user.password!,
    )

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password")
    }

    const { accessToken, refreshToken } = await generateAccessTokens(user, this.encrypter)

    // save hashed refresh token for security
    const hashedRefreshToken = await bcryptHash(refreshToken, 8)
    await this.userRepository.updateRefreshToken(hashedRefreshToken, user.id)

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      accessToken,
      refreshToken,
    }
  }

  async refreshAccessToken(request: { userId: string, refreshToken: string }) {
    const user = await this.userRepository.findById(request.userId)

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException("Access denied")
    }

    const isRefreshTokenValid = await bcryptCompare(request.refreshToken, user.refreshToken)

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException("Access denied")
    }

    const tokens = await generateAccessTokens(user, this.encrypter)

    return tokens
  }

  async signOutUser(userId: string) {
    await this.userRepository.updateRefreshToken(null, userId);
  }

}