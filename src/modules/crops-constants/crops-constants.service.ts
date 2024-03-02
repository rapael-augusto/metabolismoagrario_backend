import { Injectable } from '@nestjs/common';
import { CreateCropsConstantsDto } from './dto/create-crops-constant.dto';
import { ConstantsRepository } from '@db/repositories/constants.repository';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CropsConstantsService {
  constructor(private cropsConstantsRepository: ConstantsRepository) { }

  async create(cropId: string, createCropsConstantDto: CreateCropsConstantsDto) {
    await this.cropsConstantsRepository.createMany(createCropsConstantDto.constants.map(constant =>
      ({ id: randomUUID(), cropId, ...constant, })))
  }

  async remove(id: string) {
    return `This action removes a #${id} cropsConstant`;
  }
}
