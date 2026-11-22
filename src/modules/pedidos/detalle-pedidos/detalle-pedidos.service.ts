import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client.js';
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
    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestException('El id debe ser un entero positivo.');
    }

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

  async create(createDetallePedidoDto: CreateDetallePedidoDto) {
    const { producto_id, talle, cantidad } = createDetallePedidoDto;
    await this.validateStock(producto_id, talle, cantidad);

    try {
      return await this.prisma.detalles_pedido.create({
        data: createDetallePedidoDto,
      });
    } catch (error) {
      this.handleWriteError(error);
    }
  }

  async replace(id: number, replaceDetallePedidoDto: CreateDetallePedidoDto) {
    await this.findOne(id);
    const { producto_id, talle, cantidad } = replaceDetallePedidoDto;
    await this.validateStock(producto_id, talle, cantidad);

    try {
      return await this.prisma.detalles_pedido.update({
        where: { id },
        data: replaceDetallePedidoDto,
      });
    } catch (error) {
      this.handleWriteError(error, id);
    }
  }

  async update(id: number, updateDetallePedidoDto: UpdateDetallePedidoDto) {
    const detalle = await this.findOne(id);
    const { producto_id, talle, cantidad } = updateDetallePedidoDto;
    if (
      producto_id !== undefined ||
      talle !== undefined ||
      cantidad !== undefined
    ) {
      await this.validateStock(
        producto_id ?? detalle.producto_id,
        talle ?? detalle.talle,
        cantidad ?? detalle.cantidad,
      );
    }

    try {
      return await this.prisma.detalles_pedido.update({
        where: { id },
        data: updateDetallePedidoDto,
      });
    } catch (error) {
      this.handleWriteError(error, id);
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    try {
      return await this.prisma.detalles_pedido.delete({ where: { id } });
    } catch (error) {
      this.handleWriteError(error, id);
    }
  }

  private async validateStock(
    productoId: number,
    talle: string,
    cantidad: number,
  ) {
    const producto = await this.prisma.productos.findUnique({
      where: { id: productoId },
      select: { stock_s: true, stock_m: true, stock_l: true, stock_xl: true },
    });

    if (!producto) {
      throw new NotFoundException(
        `No existe un producto con id ${productoId}.`,
      );
    }

    const stockPorTalle: Record<string, number | undefined> = {
      S: producto.stock_s,
      M: producto.stock_m,
      L: producto.stock_l,
      XL: producto.stock_xl,
    };
    const stock = stockPorTalle[talle];

    if (typeof stock !== 'number') {
      throw new BadRequestException('El talle debe ser S, M, L o XL.');
    }

    if (cantidad > stock) {
      throw new ConflictException(
        `No hay stock suficiente para el talle ${talle}.`,
      );
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
        throw new NotFoundException(
          `No existe un detalle de pedido con id ${id}.`,
        );
      }
    }

    throw error;
  }
}
