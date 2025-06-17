import { CultivarReviewRepository } from '@db/repositories/cultivarReview.repository';
import { ReferenceRepository } from '@db/repositories/reference.repository';
import { ReferenceService } from '@modules/reference/reference.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateCultivarReviewDto } from './dto/update-cultivar-review.dto';
import { ReviewStatus, User } from '@prisma/client';
import { CultivarsConstantsService } from '@modules/cultivars-constants/cultivars-constants.service';

@Injectable()
export class CultivarReviewService {
  constructor(
    private readonly cultivarReviewRepository: CultivarReviewRepository,
    private readonly referenceRepository: ReferenceRepository,
    private readonly referenceService: ReferenceService,
    private readonly constantsService: CultivarsConstantsService,
  ) {}

  async update(reviewId: string, user: User, data: UpdateCultivarReviewDto) {
    try {
      const reviewStored = await this.cultivarReviewRepository.findById(
        reviewId,
        {
          reference: true,
          Constants: true,
        },
      );

      if (!reviewStored)
        throw new NotFoundException('Solicitação não encontrada');
      if (reviewStored.userId !== user.id)
        throw new UnauthorizedException('Você não possui permissão');
      if (reviewStored.status !== ReviewStatus.CHANGES_REQUESTED)
        throw new UnauthorizedException(
          'O status da solicitação não permite edição',
        );

      const updates: any = {};
      if (data.reference) {
        if (reviewStored.reference.status !== ReviewStatus.CHANGES_REQUESTED) {
          throw new UnauthorizedException('A referência não permite edição');
        }

        updates.reference = await this.referenceService.update(
          reviewStored.referenceId,
          data.reference,
        );
      }

      if (data.environment) {
        const environmentUpdated =
          await this.referenceService.updateReferenceEnvironment(
            reviewStored.cultivarId,
            reviewStored.referenceId,
            reviewStored.environmentId,
            data.environment,
          );

        if (environmentUpdated) {
          await this.cultivarReviewRepository.update(reviewId, {
            Environment: {
              connect: {
                id: environmentUpdated.id,
              },
            },
          });
          updates.environment = environmentUpdated;
        }
      }

      if (data.constants && data.constants.length) {
        const reviewConstantsIds = reviewStored.Constants.map((c) => c.id);
        updates.constants = [];

        for (const constant of data.constants) {
          if (reviewConstantsIds.includes(constant.id)) {
            const updated = await this.constantsService.update(
              constant.id,
              constant,
            );
            updates.constants.push(updated);
          }
        }
      }

      return updates;
    } catch (error) {
      throw error;
    }
  }
}
