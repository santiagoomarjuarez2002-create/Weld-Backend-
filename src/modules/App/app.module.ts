import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import '../ejercicios.js';
import { AuthModule } from '../auth/auth.module.js';
import { UsuariosModule } from '../usuarios/usuarios.module.js';
import { ProductosModule } from '../productos/productos.module.js';
import { ImagenesProductoModule } from '../imagenes-producto/imagenes-producto.module.js';
import { TallesModule } from '../talles/talles.module.js';
import { ProductosTallesModule } from '../productos-talles/productos-talles.module.js';
import { PedidosModule } from '../pedidos/pedidos.module.js';
import { DetallesPedidoModule } from '../detalles-pedido/detalles-pedido.module.js';
@Module({
  imports: [
    AuthModule,
    UsuariosModule,
    ProductosModule,
    ImagenesProductoModule,
    TallesModule,
    ProductosTallesModule,
    PedidosModule,
    DetallesPedidoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
