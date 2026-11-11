import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto.js';
import { UpdatePedidoDto } from './dto/update-pedido.dto.js';

@Injectable()
export class PedidosService {
  findAll() {
    return 'Esto muestra los pedidos';
  }

  findOne(_id: number) {
    return 'Esto muestra un pedido';
  }

  create(_dto: CreatePedidoDto) {
    return 'Esto crea un pedido';
  }

  replace(_id: number, _dto: CreatePedidoDto) {
    return 'Esto reemplaza un pedido';
  }

  update(_id: number, _dto: UpdatePedidoDto) {
    return 'Esto actualiza parcialmente un pedido';
  }

  remove(_id: number) {
    return 'Esto elimina un pedido';
  }
}
