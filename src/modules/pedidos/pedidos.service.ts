import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { CreatePedidoDto } from './dto/create-pedido.dto.js';
import { UpdatePedidoDto } from './dto/update-pedido.dto.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class PedidosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.pedidos.findMany();
  }

  async findOne(id: number) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestException('El id debe ser un entero positivo.');
    }

    const pedido = await this.prisma.pedidos.findUnique({ where: { id } });

    if (!pedido) {
      throw new NotFoundException(`No existe un pedido con id ${id}.`);
    }

    return pedido;
  }

  async create(createPedidoDto: CreatePedidoDto) {
    try {
      return await this.prisma.pedidos.create({ data: createPedidoDto });
    } catch (error) {
      this.handleWriteError(error);
    }
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    await this.findOne(id);
    try {
      return await this.prisma.pedidos.update({
        where: { id },
        data: updatePedidoDto,
      });
    } catch (error) {
      this.handleWriteError(error, id);
    }
  }

  async replace(id: number, replacePedidoDto: CreatePedidoDto) {
    await this.findOne(id);

    try {
      return await this.prisma.pedidos.update({
        where: { id },
        data: replacePedidoDto,
      });
    } catch (error) {
      this.handleWriteError(error, id);
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    try {
      return await this.prisma.pedidos.delete({ where: { id } });
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
        throw new NotFoundException(`No existe un pedido con id ${id}.`);
      }
    }

    throw error;
  }
}
