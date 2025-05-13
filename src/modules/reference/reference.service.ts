import { ReferenceRepository } from '@db/repositories/reference.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CultivarsRepository } from '@db/repositories/cultivars.repository';
import { CreateFullReferenceDTO } from './dto/create-full-reference.dto';
import { User } from '@prisma/client';
import { CultivarReviewRepository } from '@db/repositories/cultivarReview.repository';

@Injectable()
export class ReferenceService {
  constructor(
    private readonly referenceRepository: ReferenceRepository,
    private readonly cultivarsRepository: CultivarsRepository,
    private readonly cultivarReviewsRepository: CultivarReviewRepository,
  ) {}

  async create(cultivarId: string, data: CreateFullReferenceDTO, user: User) {
    const cultivar = await this.cultivarsRepository.findById(cultivarId);
    const isAdmin = user.role === 'ADMIN';
    if (!cultivar) throw new NotFoundException('Cultivar not found');

    // Implementa uma transação (ou cria todos os modelos ou dá rollback no banco)
    const result = isAdmin
      ? await this.referenceRepository.createFullReference(cultivarId, data)
      : await this.referenceRepository.createFullRequest(
          cultivarId,
          data,
          user,
        );

    if (!result) throw new BadRequestException("Reference can't be created");

    // Se não foi possível criar o ambiente, retorna erro
    if (!result.environment) {
      throw new BadRequestException("Environment can't be created");
    }

    // Se não foi possível criar as constants, retorna erro
    if (!result.constants) {
      throw new BadRequestException("Constants can't be created");
    }

    // Se não foi possível criar a referência, retorna erro
    if (!result.reference) {
      throw new BadRequestException("Reference can't be created");
    }

    return result;
  }

  async listTitles() {
    return this.referenceRepository.listTitles();
  }
}
