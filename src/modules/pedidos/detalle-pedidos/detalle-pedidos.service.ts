import { Injectable } from '@nestjs/common';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto.js';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto.js';

@Injectable()
export class DetallePedidosService {
  findAll() {
    return 'Esto muestra los detalles de pedidos';
  }

  findOne(_id: number) {
    return 'Esto muestra un detalle de pedido';
  }

  create(_dto: CreateDetallePedidoDto) {
    return 'Esto crea un detalle de pedido';
  }

  replace(_id: number, _dto: CreateDetallePedidoDto) {
    return 'Esto reemplaza un detalle de pedido';
  }

  update(_id: number, _dto: UpdateDetallePedidoDto) {
    return 'Esto actualiza parcialmente un detalle de pedido';
  }

  remove(_id: number) {
    return 'Esto elimina un detalle de pedido';
  }
}
