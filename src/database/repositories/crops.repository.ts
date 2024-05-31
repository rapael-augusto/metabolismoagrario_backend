import { Injectable } from "@nestjs/common";
import { Climates, ReviewStatus } from "@prisma/client";
import { PrismaService } from "../prisma.service";


export interface CreateCropData {
  id: string
  name: string
  scientificName: string
  climate: Climates
  status: ReviewStatus
  userId: string
}

@Injectable()
export class CropsRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateCropData) {
    const crops = await this.prisma.crop.create({
      data,
    })

    return crops
  }

  async findById(id: string) {
    return await this.prisma.crop.findUnique({ where: { id }, include: { constants: true } })
  }

  async review({ id, status, reviewerId }: { id: string, status: Omit<ReviewStatus, 'Pending'>, reviewerId: string }) {
    return await this.prisma.crop.update({
      where: {
        id,
        status: 'Pending'
      },
      data: {
        status: status as ReviewStatus,
        reviewerId,
      }
    })
  }

  async listAllPending() {
    return await this.prisma.crop.findMany({
      where: {
        status: ReviewStatus.Pending
      }
    })
  }

  async listAllApproved() {
    return await this.prisma.crop.findMany({
      where: {
        status: ReviewStatus.Approved
      }
    })
  }
}