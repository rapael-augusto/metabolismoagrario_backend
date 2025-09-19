import { Prisma, ReviewStatus, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReferenceDTO } from '@modules/reference/dto/create-reference.dto';
import { UpdateReferenceDto } from '@modules/reference/dto/update-reference.dto';
import { CreateFullReferenceDTO } from '@modules/reference/dto/create-full-reference.dto';
import { toTitleCase } from 'src/utils/util';

@Injectable()
export class ReferenceRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReferenceDTO) {
    const { cultivarId, ...referenceData } = data;

    return await this.prisma.$transaction(async (prisma) => {
      const reference = await prisma.reference.create({
        data: referenceData,
      });

      await prisma.cultivarReference.create({
        data: {
          cultivarId,
          referenceId: reference.id,
        },
      });

      return reference;
    });
  }

  async findOne(
    where: Prisma.ReferenceWhereInput,
    include?: Prisma.ReferenceInclude,
  ) {
    return await this.prisma.reference.findFirst({ where, include });
  }

  async findById(id: string, include?: Prisma.ReferenceInclude) {
    return await this.prisma.reference.findUnique({
      where: { id },
      include,
    });
  }

  async findAll(
    where?: Prisma.ReferenceWhereInput,
    include?: Prisma.ReferenceInclude,
  ) {
    return await this.prisma.reference.findMany({
      where,
      include,
    });
  }

  async listTitles() {
    return await this.prisma.reference.findMany({
      where: {
        status: ReviewStatus.APPROVED,
      },
      select: {
        title: true,
      },
    });
  }

  async update(id: string, data: Prisma.ReferenceUpdateInput) {
    try {
      return this.prisma.reference.update({
        data,
        where: {
          id,
        },
      });
    } catch (error) {
      throw new error();
    }
  }

  async remove(id: string) {
    return this.prisma.reference.delete({ where: { id } });
  }

  async removeMany(where: Prisma.ReferenceWhereInput) {
    return this.prisma.reference.deleteMany({ where });
  }

  /*
   * Método createFullReference
   * data: {cultivars: [], reference: {}, environment: {}}
   * Cria todos registros relacionados a uma referência (cultivars e ambiente)
   * Utiliza transactional pra evitar que haja registros sem estar relacionados
   */
  async createFullReference(cultivarId: string, data: CreateFullReferenceDTO) {
    const {
      reference: referenceData,
      environment: environmentData,
      constants: constantsData,
    } = data;

    return this.prisma.$transaction(async (prisma) => {
      // Procura a referência pelo título (ÚNICO) e carrega a relação com a cultivarId
      let referenceStored = await prisma.reference.findFirst({
        where: { title: referenceData.title },
        include: {
          cultivarReferences: {
            where: { cultivarId },
          },
        },
      });

      if (!referenceStored) {
        // Se não existir a referência, cria e associa à cultivar
        referenceStored = await prisma.reference.create({
          data: {
            ...referenceData,
            status: ReviewStatus.APPROVED,
          },
          include: { cultivarReferences: true },
        });

        await prisma.cultivarReference.create({
          data: {
            cultivarId,
            referenceId: referenceStored.id,
          },
        });
      } else if (referenceStored.cultivarReferences.length === 0) {
        // Se a referência já existir, verifica se precisa criar a relação com a cultivar
        await prisma.cultivarReference.create({
          data: {
            cultivarId,
            referenceId: referenceStored.id,
          },
        });
      }

      const { country: countryName, ...rest } = environmentData;

      // Procura país pelo nome (ÚNICO)
      const countryStored = await prisma.country.findUnique({
        where: { nome_pais: countryName },
      });

      if (!countryStored) {
        throw new NotFoundException(`País ${countryName} not found.`);
      }

      // Procura se há um ambiente com as mesmas características, pra evitar de criar um ambiente desnecessário
      let environmentStored = await prisma.environment.findFirst({
        where: { ...rest, countryId: countryStored?.id },
      });

      if (!environmentStored) {
        // se não houve um ambiente, cria um novo
        environmentStored = await prisma.environment.create({
          data: {
            ...rest,
            country: {
              connect: { id: countryStored.id },
            },
          },
        });
      }
      // cria as constantes associando à referência e ao ambiente
      const constantsCreated = await prisma.constant.createMany({
        data: constantsData.map((constant: any) => ({
          ...constant,
          environmentId: environmentStored.id,
          referenceId: referenceStored.id,
          cultivarId,
          status: ReviewStatus.APPROVED,
        })),
      });

      return {
        constants: constantsCreated,
        environment: environmentStored,
        reference: referenceStored,
      };
    });
  }

  async createFullRequest(
    cultivarId: string,
    data: CreateFullReferenceDTO,
    user: User,
  ) {
    const {
      reference: referenceData,
      environment: environmentData,
      constants: constantsData,
    } = data;

    return this.prisma.$transaction(async (prisma) => {
      // Procura a referência pelo título (ÚNICO) e carrega a relação com a cultivarId
      let referenceStored = await prisma.reference.findFirst({
        where: { title: referenceData.title },
        include: {
          cultivarReferences: {
            where: { cultivarId },
          },
        },
      });

      if (!referenceStored) {
        referenceData.title = toTitleCase(referenceData.title.trim());
        // Se não existir a referência, cria e associa à cultivar
        referenceStored = await prisma.reference.create({
          data: {
            ...referenceData,
            status: ReviewStatus.PENDING,
          },
          include: { cultivarReferences: true },
        });

        await prisma.cultivarReference.create({
          data: {
            cultivarId,
            referenceId: referenceStored.id,
          },
        });
      } else if (referenceStored.cultivarReferences.length === 0) {
        // Se a referência já existir, verifica se precisa criar a relação com a cultivar
        await prisma.cultivarReference.create({
          data: {
            cultivarId,
            referenceId: referenceStored.id,
          },
        });
      }

      const { country: countryName, ...rest } = environmentData;

      // Procura país pelo nome (ÚNICO)
      const countryStored = await prisma.country.findUnique({
        where: { nome_pais: countryName },
      });

      if (!countryStored) {
        throw new NotFoundException(`País ${countryName} not found.`);
      }

      // Procura se há um ambiente com as mesmas características, pra evitar de criar um ambiente desnecessário
      let environmentStored = await prisma.environment.findFirst({
        where: { ...rest, countryId: countryStored?.id },
      });

      if (!environmentStored) {
        // se não houve um ambiente, cria um novo
        environmentStored = await prisma.environment.create({
          data: {
            ...rest,
            country: {
              connect: { id: countryStored.id },
            },
          },
        });
      }

      const reviewStored = await prisma.cultivarReview.create({
        data: {
          cultivarId,
          userId: user.id,
          referenceId: referenceStored.id,
          environmentId: environmentStored.id,
        },
      });

      // cria as constantes associando à referência e ao ambiente
      const constantsCreated = await prisma.constant.createMany({
        data: constantsData.map((constant: any) => ({
          ...constant,
          environmentId: environmentStored.id,
          referenceId: referenceStored.id,
          cultivarId,
          status: ReviewStatus.PENDING,
          reviewId: reviewStored.id,
        })),
      });

      return {
        constants: constantsCreated,
        environment: environmentStored,
        reference: referenceStored,
      };
    });
  }
}
