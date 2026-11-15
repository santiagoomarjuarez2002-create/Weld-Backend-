import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto.js';
import { UpdateProductoDto } from './dto/update-producto.dto.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class ProductosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.productos.findMany();
  }

  async findOne(id: number) {
    const producto = await this.prisma.productos.findUnique({ where: { id } });

      if (!producto) {
      throw new NotFoundException(`No existe un producto con id ${id}.`);
    }

    return producto;
  }

  async create(createProductoDto: CreateProductoDto) {
    return this.prisma.productos.create({ data: createProductoDto });
  }


  async update(id: number, dto: UpdateProductoDto) {
    await this.findOne(id);
     return this.prisma.productos.update({ where: { id }, data: dto });
  }

  async replace(id: number, dto: CreateProductoDto) {
  await this.findOne(id);

  return await this.prisma.productos.update({
    where: { id },
    data: dto,
  });
}

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.productos.delete({ where: { id } });
  }
}