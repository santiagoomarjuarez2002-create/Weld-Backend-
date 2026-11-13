import { Module } from '@nestjs/common';
import { DetallePedidosController } from './detalle-pedidos.controller.js';
import { DetallePedidosService } from './detalle-pedidos.service.js';

@Module({
  controllers: [DetallePedidosController],
  providers: [DetallePedidosService],
})
export class DetallePedidosModule {}
