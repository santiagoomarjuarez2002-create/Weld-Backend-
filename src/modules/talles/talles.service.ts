import { Injectable } from '@nestjs/common';
import { CreateTalleDto } from './dto/create-talle.dto.js';
import { UpdateTalleDto } from './dto/update-talle.dto.js';

@Injectable()
export class TallesService {
  create(createTalleDto: CreateTalleDto) {
    return 'This action adds a new talle';
  }

  findAll() {
    return `This action returns all talles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} talle`;
  }

  update(id: number, updateTalleDto: UpdateTalleDto) {
    return `This action updates a #${id} talle`;
  }

  remove(id: number) {
    return `This action removes a #${id} talle`;
  }
}
