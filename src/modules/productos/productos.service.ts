import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto.js';
import { UpdateProductoDto } from './dto/update-producto.dto.js';

@Injectable()
export class ProductosService {
  findAll() {
    return 'Esto muestra los productos';
  }

  findOne(_id: number) {
    return 'Esto muestra un producto';
  }

  create(_dto: CreateProductoDto) {
    return 'Esto crea un producto';
  }

  replace(_id: number, _dto: CreateProductoDto) {
    return 'Esto reemplaza un producto';
  }

  update(_id: number, _dto: UpdateProductoDto) {
    return 'Esto actualiza parcialmente un producto';
  }

  remove(_id: number) {
    return 'Esto elimina un producto';
  }
}
