import { CreateCustomBiomeData, CustomBiomeRepository } from "@db/repositories/custom-biome.repository";
import { Injectable } from "@nestjs/common";
import { CreateCustomBiomeDto } from "./dto/create-custom-biome.dto";
import { randomUUID } from "crypto";
import { UpdateCustomBiomeDto } from "./dto/update-custom-biome.dto";

@Injectable()
export class CustomBiomeService {
  constructor(private customBiomeRepository: CustomBiomeRepository) { }

  async create(resquest: CreateCustomBiomeDto) {
    const createCustomBiomeData: CreateCustomBiomeData = {
      id: randomUUID(),
      name: resquest.name
    }
    return await this.customBiomeRepository.create(createCustomBiomeData)
  }

  async findOne(id: string) {
    return await this.customBiomeRepository.findOne(id)
  }

  async findAll() {
    return await this.customBiomeRepository.findAll()
  }

  async update(id: string, UpdateCustomBiomeDto: UpdateCustomBiomeDto) {
    return await this.customBiomeRepository.update(id, UpdateCustomBiomeDto)
  }

  async remove(id: string) {
    return await this.customBiomeRepository.remove(id)
  }
}