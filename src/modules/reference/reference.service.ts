import { ReferenceRepository } from '@db/repositories/reference.repository';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CultivarsRepository } from '@db/repositories/cultivars.repository';
import { CreateFullReferenceDTO } from './dto/create-full-reference.dto';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { UpdateReferenceDto } from './dto/update-reference.dto';
import { DeleteManyReferenceDTO } from './dto/delete-many-reference.dto';
import { UpdateEnvironmentDTO } from '@modules/environment/dto/update-environment.dto';
import { EnvironmentRepository } from '@db/repositories/environment.repository';
import { ConstantsRepository } from '@db/repositories/constants.repository';
import { CreateEnvironmentDTO } from '@modules/environment/dto/create-envirionment.dto';
import { BiomeTypes, ClimatesTypes } from '@/types/index';
import { toTitleCase } from 'src/utils/util';
@Injectable()
export class ReferenceService {
  private readonly prisma = new PrismaClient();
  constructor(
    private readonly referenceRepository: ReferenceRepository,
    private readonly cultivarsRepository: CultivarsRepository,
    private readonly environmentRepository: EnvironmentRepository,
    private readonly constantsRepository: ConstantsRepository,
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

    const referenceWithSameTitle = await this.referenceRepository.findOne({
      title: {
        equals: data.title,
        mode: 'insensitive'
      },
      id: {
        not: referenceId,
      },
    });

    if (referenceWithSameTitle)
      throw new ConflictException('Já existe uma referência com esse título');

    await this.referenceRepository.update(referenceId, data);
  }

  async updateReferenceEnvironment(
    cultivarId: string,
    referenceId: string,
    environmentId: string,
    data: UpdateEnvironmentDTO,
  ) {
    const environmentStored: any = await this.environmentRepository.findById(
      environmentId,
      { country: true },
    );

    if (!environmentStored)
      throw new NotFoundException('Ambiente não encontrado');

    let countryId = environmentStored.countryId;
    if (data.country) {
      const country = await this.prisma.country.findFirst({
        where: { nome_pais: data.country },
      });

      if (!country) {
        throw new NotFoundException('País não encontrado');
      }

      countryId = country.id;
    }

    const updatedData: CreateEnvironmentDTO = {
      country: data.country ?? environmentStored.country.nome_pais,
      climate:
        (data.climate as ClimatesTypes) ??
        environmentStored.climate ??
        undefined,
      biome: (data.biome as BiomeTypes) ?? environmentStored.biome ?? undefined,
      customBiome:
        data.customBiome ?? environmentStored.customBiome ?? undefined,
      irrigation: data.irrigation ?? environmentStored.irrigation ?? undefined,
      soil: data.soil ?? environmentStored.soil ?? undefined,
      customSoil: data.customSoil ?? environmentStored.customSoil ?? undefined,
      cultivationSystem:
        data.cultivationSystem ??
        environmentStored.cultivationSystem ??
        undefined,
    };

    // Verifica se já existe outro ambiente com os mesmos dados
    const existingEnvironment = await this.environmentRepository.findOne(
      {
        countryId: countryId,
        climate: updatedData.climate,
        biome: updatedData.biome,
        customBiome: updatedData.customBiome,
        irrigation: updatedData.irrigation,
        soil: updatedData.soil,
        customSoil: updatedData.customSoil,
        cultivationSystem: updatedData.cultivationSystem,
      },
      { country: true },
    );

    if (existingEnvironment) {
      if (existingEnvironment.id === environmentStored.id)
        return existingEnvironment;

      // verifica se o novo ambiente, já não está associado à mesma referência
      const constantsWithSameEnvironment = await this.prisma.constant.findFirst({where: {
        referenceId,
        environmentId: existingEnvironment.id,
        cultivarId,
      }})

      if (constantsWithSameEnvironment) 
        throw new ConflictException('Um mesmo ambiente pra mesma referência foi encontrado. Tente deletá-lo antes')

      await this.prisma.constant.updateMany({
        where: { environmentId, referenceId, cultivarId },
        data: { environmentId: existingEnvironment.id },
      });

      return existingEnvironment;
    }

    const cleanData = Object.fromEntries(
      Object.entries(updatedData).filter(([_, value]) => value !== undefined),
    ) as CreateEnvironmentDTO;

    const newEnvironment = await this.environmentRepository.create(cleanData);

    // atualiza as constantes pro novo ambiente
    await this.prisma.constant.updateMany({
      where: { environmentId, referenceId, cultivarId },
      data: { environmentId: newEnvironment.id },
    });

    return newEnvironment;
  }
}
