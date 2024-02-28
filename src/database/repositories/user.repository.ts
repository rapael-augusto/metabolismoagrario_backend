import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: User) {
    const user = await this.prisma.user.create({
      data,
    })

    return user
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  async updateRefreshToken(refreshToken: string | null, userId: string) {
    return await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        refreshToken
      }
    })
  }

  async list() {
    return await this.prisma.user.findMany()
  }
}