import { Injectable } from '@nestjs/common';
import { CreateDetallesPedidoDto } from './dto/create-detalles-pedido.dto.js';
import { UpdateDetallesPedidoDto } from './dto/update-detalles-pedido.dto.js';

@Injectable()
export class DetallesPedidoService {
  create(createDetallesPedidoDto: CreateDetallesPedidoDto) {
    return 'This action adds a new detallesPedido';
  }

  findAll() {
    return `This action returns all detallesPedido`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detallesPedido`;
  }

  update(id: number, updateDetallesPedidoDto: UpdateDetallesPedidoDto) {
    return `This action updates a #${id} detallesPedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} detallesPedido`;
  }
}
