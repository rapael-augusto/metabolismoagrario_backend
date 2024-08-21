import { CreateCustomSoilData, CustomSoilRepository } from "@db/repositories/custom-soil.repository";
import { Injectable } from "@nestjs/common";
import { CreateCustomSoilDto } from "./dto/create-custom-soil.dto";
import { randomUUID } from "crypto";
import { UpdateCustomSoilDto } from "./dto/update-custom-soil.dto";

@Injectable()
export class CustomSoilService {
  constructor(private customSoilRepository: CustomSoilRepository) {}

  async create(request: CreateCustomSoilDto) {
    const createCustomSoilData: CreateCustomSoilData = {
      id: randomUUID(),
      name: request.name,
    }

    return await this.customSoilRepository.create(createCustomSoilData)
  }

  async findAll() {
    const customSoil = await this.customSoilRepository.findAll()

    return customSoil
  }

  async findOne(id: string) {
    const customSoil = await this.customSoilRepository.findById(id)  
  
    return customSoil
  }

  async update(id: string, updateCustomSoilDto: UpdateCustomSoilDto) {
    return await this.customSoilRepository.update(id, updateCustomSoilDto)
  }

  async remove(id: string) {
    return await this.customSoilRepository.remove(id)
  }
}