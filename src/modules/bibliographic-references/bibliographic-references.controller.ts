import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BibliographicReferencesService } from './bibliographic-references.service';
import { CreateBibliographicReferenceDto } from './dto/create-bibliographic-references.dto.ts';
import { ReviewBibliographicReferenceDto } from './dto/review-bibliographic-references.dto.ts';
import { BibliographicReference } from '@prisma/client';  

@Controller('bibliographic')
export class BibliographicReferencesController {
  constructor(private readonly service: BibliographicReferencesService) {}

  @Post()
  create(@Body() data: CreateBibliographicReferenceDto): Promise<BibliographicReference> {
    return this.service.create(data);
  }

  @Get()
  findAll(): Promise<BibliographicReference[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<BibliographicReference | null> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: ReviewBibliographicReferenceDto): Promise<BibliographicReference> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<BibliographicReference> {
    return this.service.remove(id);
  }
}
