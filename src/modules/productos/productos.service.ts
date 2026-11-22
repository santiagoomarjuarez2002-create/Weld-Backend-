import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
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
    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestException('El id debe ser un entero positivo.');
    }

    const producto = await this.prisma.productos.findUnique({ where: { id } });

    if (!producto) {
      throw new NotFoundException(`No existe un producto con id ${id}.`);
    }

    return producto;
  }

  async create(createProductoDto: CreateProductoDto) {
    try {
      return await this.prisma.productos.create({ data: createProductoDto });
    } catch (error) {
      this.handleWriteError(error);
    }
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    await this.findOne(id);
    try {
      return await this.prisma.productos.update({
        where: { id },
        data: updateProductoDto,
      });
    } catch (error) {
      this.handleWriteError(error, id);
    }
  }

  async replace(id: number, replaceProductoDto: CreateProductoDto) {
    await this.findOne(id);

    try {
      return await this.prisma.productos.update({
        where: { id },
        data: replaceProductoDto,
      });
    } catch (error) {
      this.handleWriteError(error, id);
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    try {
      return await this.prisma.productos.delete({ where: { id } });
    } catch (error) {
      this.handleWriteError(error, id);
    }
  }

  private handleWriteError(error: unknown, id?: number): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictException('Ya existe un registro con esos datos.');
      }

      if (error.code === 'P2003') {
        throw new ConflictException(
          'La operación entra en conflicto con registros relacionados.',
        );
      }

      if (error.code === 'P2025' && id !== undefined) {
        throw new NotFoundException(`No existe un producto con id ${id}.`);
      }
    }

    throw error;
  }
}
