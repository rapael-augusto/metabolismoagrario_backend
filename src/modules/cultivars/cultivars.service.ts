import { CultivarsRepository } from '@db/repositories/cultivars.repository';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCultivarDto } from './dto/update-cultivar.dto';
import { CreateCultivarDto } from './dto/create-cultivar.dto';
import { User } from '@prisma/client';

@Injectable()
export class CultivarsService {
  constructor(private cultivarsRepository: CultivarsRepository) {}

  async create(cropId: string, request: CreateCultivarDto, user: User) {
    try {
      const { name } = request;
      const status = user.role === 'ADMIN' ? 'Approved' : 'Pending';
      return await this.cultivarsRepository.create({ name, cropId, status });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    return await this.cultivarsRepository.findById(id);
  }

  async update(
    cultivarId: string,
    updateCultivarDto: UpdateCultivarDto,
    user: User,
  ) {
    try {
      if (updateCultivarDto.status && user.role !== 'ADMIN')
        throw new ConflictException("You can't change the status!");

      return await this.cultivarsRepository.update(
        cultivarId,
        updateCultivarDto,
      );
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async remove(id: string) {
    console.log(`Cultivar com id ${id} removida com sucesso`);
    try {
      return await this.cultivarsRepository.remove(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
