import { Injectable, NotFoundException } from '@nestjs/common';
import { EnvironmentRepository } from '@db/repositories/environment.repository';
import { CreateEnvironmentDTO } from './dto/create-envirionment.dto';
import { ConstantsRepository } from '@db/repositories/constants.repository';
import { CultivarReviewRepository } from '@db/repositories/cultivarReview.repository';
import { CultivarsRepository } from '@db/repositories/cultivars.repository';
import { ReferenceRepository } from '@db/repositories/reference.repository';
import { PrismaClient } from '@prisma/client';
import { DeleteEnvironmentDTO } from './dto/delete-environment.dto';

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

  // Verifica se existe constantes associadas a [referenceID, environmentId]
  // Se houver, apaga as constantes. Verifica se ainda há constantes associadas
  // ao environmentId. Se não houver, deleta o environment
  // se não houver mais constants associadas à referência, apaga a referência
  async remove(data: DeleteEnvironmentDTO) {
    const { environmentId, referenceId, cultivarId } = data;

    const cultivarAssociatedToReference =
      await this.cultivarsRepository.findById(cultivarId);

    if (!cultivarAssociatedToReference)
      throw new NotFoundException('Cultivar não encontrada');

    // Remove constantes associadas aos environments
    await this.constantsRepository.removeMany({
      referenceId,
      environmentId,
    });

    // verifica se o ambiente é orfão de constantes
    const envHasConstants = await this.constantsRepository.findMany({
      environmentId,
    });

    if (!envHasConstants) {
      // Deleta os environments sem constantes
      await this.environmentRepository.remove(environmentId);
    }

    // Verifica se a referência ainda tem constants
    const referenceHasConstants = await this.constantsRepository.find({
      referenceId,
      cultivarId,
    });

    if (referenceHasConstants) return;

    // remove referência orfã de constantes
    await this.referenceRepository.remove(referenceId);
  }
}
