import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service.js';
import { PedidosController } from './pedidos.controller.js';
import { DetallePedidosModule } from './detalle-pedidos/detalle-pedidos.module.js';

@Module({
  imports: [DetallePedidosModule],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
