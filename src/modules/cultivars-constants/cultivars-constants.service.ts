import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCultivarConstantDto } from './dto/create-cultivars-constant.dto';
import { ConstantsRepository } from '@db/repositories/constants.repository';
import { UpdateCultivarsConstantDto } from './dto/update-cultivars-constant.dto';
import { ReferenceRepository } from '@db/repositories/reference.repository';
import { EnvironmentRepository } from '@db/repositories/environment.repository';
import { CreateManyCultivarConstantsDTO } from './dto/create-many-cultivars-constants.dto';

@Injectable()
export class CultivarsConstantsService {
  constructor(
    private cultivarsConstantsRepository: ConstantsRepository,
    private readonly referenceRepository: ReferenceRepository,
    private readonly environmentRepository: EnvironmentRepository,
  ) {}

  async create(
    cultivarId: string,
    createCultivarsConstantDto: CreateCultivarConstantDto,
  ) {
    return await this.cultivarsConstantsRepository.create({
      cultivarId,
      ...createCultivarsConstantDto,
    });
  }

  async createMany(cultivarId: string, data: CreateManyCultivarConstantsDTO) {
    try {
      const { referenceId, environmentId } = data;
      const referenceStored = this.referenceRepository.findById(referenceId);
      if (!referenceStored) throw new NotFoundException('Referência não encontrada');

      const environmentStored =
        this.environmentRepository.findById(environmentId);

      if (!environmentStored)
        throw new NotFoundException('Ambiente não encontrado');

      return this.cultivarsConstantsRepository.createMany(data, cultivarId);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(
    cultivarId: string,
    updateCultivarsConstantDto: UpdateCultivarsConstantDto,
  ) {
    try {
      return await this.cultivarsConstantsRepository.update(
        cultivarId,
        updateCultivarsConstantDto,
      );
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async remove(id: string) {
    console.log(`Fator de conversão ${id} removido com sucesso`);
    try {
      return await this.cultivarsConstantsRepository.remove(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
