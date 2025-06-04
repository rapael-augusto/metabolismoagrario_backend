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
}
