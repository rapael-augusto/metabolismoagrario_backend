import { Injectable, NotFoundException } from '@nestjs/common';
import { EnvironmentRepository } from '@db/repositories/environment.repository';
import { CreateEnvironmentDTO } from './dto/create-envirionment.dto';
import { DeleteManyEnvironmentsDto } from '@modules/environment/dto/delete-many-environment.dto';
import { ConstantsRepository } from '@db/repositories/constants.repository';
import { CultivarReviewRepository } from '@db/repositories/cultivarReview.repository';
import { CultivarsRepository } from '@db/repositories/cultivars.repository';
import { ReferenceRepository } from '@db/repositories/reference.repository';
import { PrismaClient } from '@prisma/client';
import { UpdateEnvironmentDTO } from './dto/update-environment.dto';

@Injectable()
export class EnvironmentService {
  private readonly prisma = new PrismaClient();
  constructor(
    private readonly referenceRepository: ReferenceRepository,
    private readonly cultivarsRepository: CultivarsRepository,
    private readonly cultivarReviewsRepository: CultivarReviewRepository,
    private readonly constantsRepository: ConstantsRepository,
    private readonly environmentRepository: EnvironmentRepository,
  ) {}

  async create(data: CreateEnvironmentDTO) {
    return await this.environmentRepository.create(data);
  }

  async findById(id: string) {
    const environment = await this.environmentRepository.findById(id);
    if (!environment) {
      throw new NotFoundException(`Environment com ID ${id} não encontrado.`);
    }
    return environment;
  }

  async remove(id: string) {
    const environment = await this.environmentRepository.findById(id);
    if (!environment) {
      throw new NotFoundException(`Environment com ID ${id} não encontrado.`);
    }

    return await this.environmentRepository.remove(id);
  }

  // Verifica se existe constantes associadas a [referenceID, environmentId]
  // Se houver, apaga as constantes. Verifica se ainda há constantes associadas
  // ao environmentId. Se não houver, deleta o environment
  // se não houver mais constants associadas à referência, apaga a referência
  async removeManyEnvironments(
    referenceId: string,
    data: DeleteManyEnvironmentsDto,
  ) {
    const { environments: environmentIds, cultivarId } = data;

    const cultivarAssociatedToReference =
      await this.cultivarsRepository.findById(cultivarId);

    if (!cultivarAssociatedToReference)
      throw new NotFoundException('Cultivar não encontrada');

    // Remove constantes associadas aos environments
    await this.constantsRepository.removeMany({
      referenceId,
      environmentId: { in: environmentIds },
    });

    // verifica se o ambiente é orfão de constantes
    const environmentsWithConstants = await this.constantsRepository.findMany({
      environmentId: { in: environmentIds },
    });

    const environmentsWithConstantsIds = environmentsWithConstants.map(
      (c) => c.environmentId,
    );

    const environmentsToDelete = environmentIds.filter(
      (id) => !environmentsWithConstantsIds.includes(id),
    );

    // Deleta os environments sem constantes
    const environmentDeleted = await this.environmentRepository.removeMany({
      id: { in: environmentsToDelete },
    });

    // Verifica se a referência ainda tem constants
    const referenceHasConstants = await this.constantsRepository.find({
      referenceId,
      cultivarId,
    });

    if (referenceHasConstants) return environmentDeleted;

    // remove referência orfã de constantes
    await this.referenceRepository.remove(referenceId);

    return environmentDeleted;
  }
}
