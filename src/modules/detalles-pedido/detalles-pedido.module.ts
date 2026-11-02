import { Module } from '@nestjs/common';
import { DetallesPedidoService } from './detalles-pedido.service.js';
import { DetallesPedidoController } from './detalles-pedido.controller.js';

@Module({
  controllers: [DetallesPedidoController],
  providers: [DetallesPedidoService],
})
export class DetallesPedidoModule {}
