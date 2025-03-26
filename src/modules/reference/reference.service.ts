import { ReferenceRepository } from '@db/repositories/reference.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReferenceDTO } from './dto/create-reference.dto';
import { CultivarsRepository } from '@db/repositories/cultivars.repository';
import { CreateFullReferenceDTO } from './dto/create-full-reference.dto';
import { PrismaClient, User } from '@prisma/client';
import { EnvironmentRepository } from '@db/repositories/environment.repository';
import { ConstantsRepository } from '@db/repositories/constants.repository';
import { constants } from 'buffer';
import { CultivarReviewRepository } from '@db/repositories/cultivarReview.repository';

@Injectable()
export class ReferenceService {
  private prisma = new PrismaClient();

  constructor(
    private readonly referenceRepository: ReferenceRepository,
    private readonly cultivarsRepository: CultivarsRepository,
    private readonly cultivarReviewsRepository: CultivarReviewRepository,
  ) {}

  async create(cultivarId: string, data: CreateFullReferenceDTO, user: User) {
    const cultivar = await this.cultivarsRepository.findById(cultivarId);
    if (!cultivar) throw new NotFoundException('Nenhuma cultivar encontrada');

    // Implementa uma transação (ou cria todos os modelos ou dá rollback no banco)
    const result = await this.referenceRepository.createFullReference(
      cultivarId,
      data,
    );

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

    // Se conseguiu criar todos os modelos relacionados à referência e for OPERADOR
    // Cria um review com status pendente (ADMINS VÃO REVISAR)
    if (result.constants && user.role === 'OPERATOR') {
      const { reference } = result;
      const review = await this.cultivarReviewsRepository.create({
        cultivarId,
        referenceId: reference.id,
        userId: user.id,
      });
      return { ...result, review };
    }

    return result;
  }
}
