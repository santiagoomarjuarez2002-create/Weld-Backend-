import { Injectable } from '@nestjs/common';
import { CreateProductosTalleDto } from './dto/create-productos-talle.dto.js';
import { UpdateProductosTalleDto } from './dto/update-productos-talle.dto.js';

@Injectable()
export class ProductosTallesService {
  create(createProductosTalleDto: CreateProductosTalleDto) {
    return 'This action adds a new productosTalle';
  }

  findAll() {
    return `This action returns all productosTalles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productosTalle`;
  }

  update(id: number, updateProductosTalleDto: UpdateProductosTalleDto) {
    return `This action updates a #${id} productosTalle`;
  }

  remove(id: number) {
    return `This action removes a #${id} productosTalle`;
  }
}
