import { ReferenceRepository } from '@db/repositories/reference.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CultivarsRepository } from '@db/repositories/cultivars.repository';
import { CreateFullReferenceDTO } from './dto/create-full-reference.dto';
import { Prisma, User } from '@prisma/client';
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
}
