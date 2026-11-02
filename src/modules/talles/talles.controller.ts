import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TallesService } from './talles.service.js';
import { CreateTalleDto } from './dto/create-talle.dto.js';
import { UpdateTalleDto } from './dto/update-talle.dto.js';

@Controller('talles')
export class TallesController {
  constructor(private readonly tallesService: TallesService) {}

  @Post()
  create(@Body() createTalleDto: CreateTalleDto) {
    return this.tallesService.create(createTalleDto);
  }

  @Get()
  findAll() {
    return this.tallesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tallesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTalleDto: UpdateTalleDto) {
    return this.tallesService.update(+id, updateTalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tallesService.remove(+id);
  }
}
