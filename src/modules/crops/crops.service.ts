import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCropData, CropsRepository } from '@db/repositories/crops.repository';
import { randomUUID } from 'node:crypto';
import { Climates, Crop, User } from '@prisma/client';
import { CreateCropDto } from './dto/create-crop.dto';
import { ReviewCropDto } from './dto/review-crop.dto';

interface CreateCropRequest extends CreateCropDto {
  user: User
}

interface ReviewCropRequest extends ReviewCropDto {
  id: string
  userId: string
}

@Injectable()
export class CropsService {
  constructor(private cropsRepository: CropsRepository) { }

  async create(request: CreateCropRequest) {
    let createCropData: CreateCropData = {
      id: randomUUID(),
      name: request.name,
      scientificName: request.scientificName,
      climate: request.climate,
      status: 'Approved', // ADMIN crops are created and approved by default
      userId: request.user.id
    }

    if (request.user.role === 'OPERATOR') {
      createCropData.status = "Pending" // OPERATOR crops are created with status pending and wait for admin approval
    }

    return await this.cropsRepository.create(createCropData)
  }

  async review(reviewRequest: ReviewCropRequest) { // admins are able to review pending crops created from operators
    try {
      return await this.cropsRepository.review({
        id: reviewRequest.id,
        reviewerId: reviewRequest.userId,
        status: reviewRequest.status,
      })
    } catch (error) {
      if (error.code === 'P2025') // 'Record to update not found.'
        throw new NotFoundException(`Pending Crop with id=${reviewRequest.id} not found!`)

      throw error
    }

  }

  async findAll() {
    const crops = await this.cropsRepository.listAllApproved()

    const groupedCrops: Record<Climates, Crop[]> = {
      TropicalRainforest: [],
      Tropical: [],
      Subtropical: [],
      Desert: [],
      Temperate: [],
      Mediterranean: [],
      SemiArid: [],
      Subpolar: [],
      MountainCold: [],
      Polar: [],
    }

    crops.forEach(crop => {
      groupedCrops[crop.climate].push(crop)
    })

    return groupedCrops;
  }

  async findAllPending() {
    const crops = await this.cropsRepository.listAllPending()

    const groupedCrops: Record<Climates, Crop[]> = {
      TropicalRainforest: [],
      Tropical: [],
      Subtropical: [],
      Desert: [],
      Temperate: [],
      Mediterranean: [],
      SemiArid: [],
      Subpolar: [],
      MountainCold: [],
      Polar: [],
    }

    crops.forEach(crop => {
      groupedCrops[crop.climate].push(crop)
    })

    return groupedCrops;
  }

  async findOne(id: string) {
    const crop = await this.cropsRepository.findById(id)
    if (!crop) throw new NotFoundException("Crop not found")

    return { crop }
  }

  async remove(id: string) {
    return `This action removes a #${id} crop`;
  }
}
