import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnvironmentDTO } from '@modules/environment/dto/create-envirionment.dto';

@Injectable()
export class EnvironmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEnvironmentDTO) {
    const { country: countryName, ...rest } = data;

    const envStored = await this.findOne({ ...rest });

    // se já houver um environment com as mesmas caractéristicas, só retorna o existente
    if (envStored) return envStored;

    const countryStored = await this.prisma.country.findUnique({
      where: { nome_pais: countryName },
    });
    if (!countryStored) {
      throw new NotFoundException(`País com ID ${countryName} não encontrado.`);
    }
    return await this.prisma.environment.create({
      data: {
        ...rest,
        country: {
          connect: { id: countryStored.id },
        },
      },
    });
  }

  async findOne(
    where: Prisma.EnvironmentWhereInput,
    include?: Prisma.EnvironmentInclude,
  ) {
    return await this.prisma.environment.findFirst({ where, include });
  }

  async findById(id: string, include?: Prisma.EnvironmentInclude) {
    return await this.prisma.environment.findUnique({
      where: { id },
      include,
    });
  }

  async findAll(
    where?: Prisma.EnvironmentWhereInput,
    include?: Prisma.EnvironmentInclude,
  ) {
    return await this.prisma.environment.findMany({
      where,
      include,
    });
  }

  async remove(id: string) {
    try {
      return await this.prisma.environment.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Ambiente com id ${id} não existe`);
    }
  }

  async removeMany(where: Prisma.EnvironmentWhereInput) {
    return await this.prisma.environment.deleteMany({ where });
  }
}
