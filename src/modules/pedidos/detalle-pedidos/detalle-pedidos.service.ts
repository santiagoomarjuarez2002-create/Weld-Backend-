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

  create(createDetallePedidoDto: CreateDetallePedidoDto) {
    return this.prisma.detalles_pedido.create({ data: createDetallePedidoDto });
  }

  async replace(id: number, replaceDetallePedidoDto: CreateDetallePedidoDto) {
    await this.findOne(id);
    return this.prisma.detalles_pedido.update({ where: { id }, data: replaceDetallePedidoDto });
  }

  async update(id: number, updateDetallePedidoDto: UpdateDetallePedidoDto) {
    await this.findOne(id);
    return this.prisma.detalles_pedido.update({ where: { id }, data: updateDetallePedidoDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.detalles_pedido.delete({ where: { id } });
  }
}