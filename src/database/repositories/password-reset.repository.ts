import { PrismaService } from '../../prisma.service';
import { Injectable } from '@nestjs/common';
import { PasswordResetToken, Prisma } from '@prisma/client';

@Injectable()
export class PasswordResetRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.PasswordResetTokenCreateInput,
  ): Promise<PasswordResetToken> {
    return this.prisma.passwordResetToken.create({
      data,
    });
  }

  async findByUserId(userId: string): Promise<PasswordResetToken | null> {
    return this.prisma.passwordResetToken.findFirst({
      where: { userId },
    });
  }

  async findByToken(token: string): Promise<PasswordResetToken | null> {
    return this.prisma.passwordResetToken.findFirst({
      where: { token },
    });
  }

  async delete(userId: string): Promise<PasswordResetToken> {
    return this.prisma.passwordResetToken.delete({
      where: { userId },
    });
  }
}
