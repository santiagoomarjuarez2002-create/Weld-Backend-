import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto.js';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Injectable()
export class DetallePedidosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.detalles_pedido.findMany();
  }

  async findOne(id: number) {
    const detallePedido = await this.prisma.detalles_pedido.findUnique({
      where: { id },
    });

    if (!detallePedido) {
      throw new NotFoundException(
        `No existe un detalle de pedido con id ${id}.`,
      );
    }

    return detallePedido;
  }

  create(dto: CreateDetallePedidoDto) {
    return this.prisma.detalles_pedido.create({ data: dto });
  }

  async update(id: number, dto: UpdateDetallePedidoDto) {
    await this.findOne(id);
    return this.prisma.detalles_pedido.update({ where: { id }, data: dto });
  }

  async replace(id: number, dto: CreateDetallePedidoDto) {
    await this.findOne(id);
    return this.prisma.detalles_pedido.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.detalles_pedido.delete({ where: { id } });
  }
}