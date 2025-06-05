import { ReferenceRepository } from '@db/repositories/reference.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CultivarsRepository } from '@db/repositories/cultivars.repository';
import { CreateFullReferenceDTO } from './dto/create-full-reference.dto';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { CultivarReviewRepository } from '@db/repositories/cultivarReview.repository';
import { ConstantsRepository } from '@db/repositories/constants.repository';
import {
  ReferenceUpdateCultivarConstantDto,
  UpdateReferenceDto,
} from './dto/update-reference.dto';
import { EnvironmentRepository } from '@db/repositories/environment.repository';
import { DeleteManyReferenceDTO } from './dto/delete-many-reference.dto';
import { DeleteManyEnvironmentsDto } from './dto/delete-many-environment.dto';

@Injectable()
export class ReferenceService {
  private readonly prisma = new PrismaClient();

  constructor(
    private readonly referenceRepository: ReferenceRepository,
    private readonly cultivarsRepository: CultivarsRepository,
    private readonly cultivarReviewsRepository: CultivarReviewRepository,
    private readonly constantsRepository: ConstantsRepository,
    private readonly environmentRepository: EnvironmentRepository,
  ) {}

  async create(cultivarId: string, data: CreateFullReferenceDTO, user: User) {
    const cultivar = await this.cultivarsRepository.findById(cultivarId);
    const isAdmin = user.role === 'ADMIN';

    if (!cultivar) {
      throw new NotFoundException('Cultivar não encontrada');
    }

    try {
      const result = isAdmin
        ? await this.referenceRepository.createFullReference(cultivarId, data)
        : await this.referenceRepository.createFullRequest(
            cultivarId,
            data,
            user,
          );

      if (!result?.reference) {
        throw new BadRequestException('Erro ao criar a referência');
      }

      if (!result.environment) {
        throw new BadRequestException('Erro ao criar o ambiente associado');
      }

      if (!result.constants) {
        throw new BadRequestException(
          'Erro ao criar as constantes da referência',
        );
      }

      return result;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          'Já existe uma referência com essa combinação de ambiente, cultivar e tipo.',
        );
      }

      console.error('Erro inesperado ao criar referência:', error);
      throw new BadRequestException(
        'Erro ao criar a referência. Por favor, tente novamente ou contate o suporte.',
      );
    }
  }

  async listTitles() {
    return this.referenceRepository.listTitles();
  }

  async remove(referenceId: string) {
    const existingReference = await this.referenceRepository.findById(
      referenceId,
    );

    if (!existingReference)
      throw new NotFoundException('Referência não encontrada');

    try {
      return await this.referenceRepository.remove(referenceId);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao remover a referência');
    }
  }

  async removeMany(data: DeleteManyReferenceDTO) {
    try {
      return this.referenceRepository.removeMany({
        id: { in: data.references },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao remover referência');
    }
  }

  async update(referenceId: string, data: UpdateReferenceDto) {
    const existingReference = await this.referenceRepository.findById(
      referenceId,
    );

    if (!existingReference)
      throw new NotFoundException('Referência não encontrada');

    const {
      constants: constantsData,
      environment: environmentData,
      reference: referenceData,
    } = data;

    let associatedEnvironment = null;
    if (environmentData) {
      const { country: countryName, ...rest } = environmentData;

      const countryStored = await this.prisma.country.findUnique({
        where: { nome_pais: countryName },
      });

      if (!countryStored)
        throw new NotFoundException(`País '${countryName}' não encontrado`);

      // verificar se já existe um ambiente com as mesmas características
      let existingEnvironment = await this.environmentRepository.findOne({
        countryId: countryStored.id,
        ...rest,
      });

      // se não encontrou um ambiente, cria outro
      if (!existingEnvironment) {
        existingEnvironment = await this.environmentRepository.create(
          environmentData,
        );
      }

      associatedEnvironment = existingEnvironment;
    }

    if (constantsData) {
      for (const constantData of constantsData) {
        const { id: constantId, ...rest } = constantData;

        // adiciona o environmentId (se teve o ambiente mudado)
        const constantUpdateData = {
          ...(rest as ReferenceUpdateCultivarConstantDto),
          ...(associatedEnvironment && {
            environmentId: associatedEnvironment.id,
          }),
        };

        await this.constantsRepository.update(constantId, constantUpdateData);
      }
    }

    if (referenceData) {
      await this.referenceRepository.update(referenceId, referenceData);
    }
  }

  // Verifica se existe constantes associadas a [referenceID, environmentId]
  // Se houver, apaga as constantes. Verifica se ainda há constantes associadas
  // ao environmentId. Se não houver, deleta o environment
  // se não houver mais constants associadas à referência, apaga a referência
  async removeManyEnvironments(
    referenceId: string,
    data: DeleteManyEnvironmentsDto,
  ) {
    const { environments: environmentIds } = data;

    // Remove constantes associadas aos environments
    await this.constantsRepository.removeMany({
      referenceId,
      environmentId: { in: environmentIds },
    });

    const environmentsWithConstants = await this.constantsRepository.findMany({
      environmentId: { in: environmentIds },
    });

    const environmentsToDelete = environmentsWithConstants
      ? environmentIds.filter(
          (id) =>
            !environmentsWithConstants.some((c) => c.environmentId === id),
        )
      : [];

    // Deleta os environments sem constantes
    const environmentDeleted = await this.environmentRepository.removeMany({
      id: { in: environmentsToDelete },
    });

    // Verifica se a referência ainda tem constants
    const referenceHasConstants = await this.constantsRepository.find({
      referenceId,
    });

    if (referenceHasConstants) return environmentDeleted;

    // remove a referência orfã de constants
    await this.referenceRepository.remove(referenceId);
  }
}
