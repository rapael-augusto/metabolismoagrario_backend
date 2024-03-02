import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ConstantTypes, } from "@prisma/client";

interface CreateConstantDto {
  id: string
  value: number
  reference: string // can be empty string
  comment: string // can be empty string
  type: ConstantTypes
  cropId: string // uuid
}

@Injectable()
export class ConstantsRepository {
  constructor(private prisma: PrismaService) { }

  async createMany(data: CreateConstantDto[]) {
    await this.prisma.constant.createMany({
      data,
    })
  }
}