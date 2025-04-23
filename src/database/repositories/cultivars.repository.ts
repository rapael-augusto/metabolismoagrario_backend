import { PrismaService } from 'src/prisma.service';
import { UpdateCultivarDto } from '@modules/cultivars/dto/update-cultivar.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCultivarDto } from '@modules/cultivars/dto/create-cultivar.dto';
import { ConstantTypes } from '@prisma/client';

@Injectable()
export class CultivarsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCultivarDto & { cropId: string }) {
    return await this.prisma.cultivar.create({
      data,
    });
  }

  async findById(id: string) {
    const cultivar = await this.prisma.cultivar.findUnique({
      where: {
        id,
        OR: [
          {
            cultivarReferences: {
              some: {
                reference: {
                  cultivarReviews: { every: { status: 'Approved' } },
                },
              },
            },
          },
          {
            cultivarReferences: {
              none: {},
            },
          },
        ],
      },
      include: {
        cultivarReferences: {
          include: {
            reference: {
              include: {
                constants: {
                  include: {
                    environment: {
                      include: {
                        country: {
                          select: {
                            nome_pais: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!cultivar) {
      return null;
    }

    type EnvironmentGroup = {
      [key: string]: {
        environment: {
          id: string;
          climate: string | null;
          biome: string | null;
          customBiome: string | null;
          irrigation: string | null;
          countryId: string;
          soil: string | null;
          customSoil: string | null;
          cultivationSystem: string | null;
          countryName: string;
        };
        constants: Array<{
          id: string;
          value: number;
          type: ConstantTypes;
        }>;
      };
    };

    const referencesWithEnvironments = cultivar.cultivarReferences.map(
      (ref) => {
        const environmentsMap =
          ref.reference.constants.reduce<EnvironmentGroup>((acc, constant) => {
            const environmentId = constant.environment.id;
            if (!acc[environmentId]) {
              acc[environmentId] = {
                environment: {
                  id: constant.environment.id,
                  climate: constant.environment.climate,
                  biome: constant.environment.biome,
                  customBiome: constant.environment.customBiome,
                  irrigation: constant.environment.irrigation,
                  countryId: constant.environment.countryId,
                  soil: constant.environment.soil,
                  customSoil: constant.environment.customSoil,
                  cultivationSystem: constant.environment.cultivationSystem,
                  countryName: constant.environment.country.nome_pais,
                },
                constants: [],
              };
            }
            acc[environmentId].constants.push({
              id: constant.id,
              value: constant.value,
              type: constant.type,
            });
            return acc;
          }, {});

        return {
          id: ref.reference.id,
          title: ref.reference.title,
          environments: Object.values(environmentsMap),
        };
      },
    );

    return {
      id: cultivar.id,
      name: cultivar.name,
      references: referencesWithEnvironments,
    };
  }

  async update(id: string, data: UpdateCultivarDto) {
    console.log({ data });
    try {
      return this.prisma.cultivar.update({
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
    try {
      return await this.prisma.cultivar.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Cultivar com id ${id} não existe`);
    }
  }
}
