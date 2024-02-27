import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: User) {
    const user = await this.prisma.user.create({
      data
    })

    return user
  }

  async list() {
    return await this.prisma.user.findMany()
  }
}