import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BibliographicReferencesService } from './bibliographic-references.service';
import { CreateBibliographicReferenceDto } from './dto/create-bibliographic-references.dto.ts';
import { ReviewBibliographicReferenceDto } from './dto/review-bibliographic-references.dto.ts';
import { BibliographicReference } from '../../database/repositories/bibliographic-references.repository';
import { PublicRoute } from 'src/auth/decorators/public-route-decorator';

@Controller('bibliographic')
export class BibliographicReferencesController {
  constructor(private readonly service: BibliographicReferencesService) {}

  @Post()
  async create(@Body() data: CreateBibliographicReferenceDto): Promise<BibliographicReference> {
    return await this.service.create({...data});
  }

  @Get()
  findAll(): Promise<BibliographicReference[]> {
    return this.service.findAll();
  }
  @PublicRoute()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BibliographicReference | null> {
    return await this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: ReviewBibliographicReferenceDto): Promise<BibliographicReference> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<BibliographicReference> {
    return this.service.remove(id);
  }
}
