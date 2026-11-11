import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import '../ejercicios.js';
import { AuthModule } from '../auth/auth.module.js';
import { UsuariosModule } from '../usuarios/usuarios.module.js';
import { ProductosModule } from '../productos/productos.module.js';
import { PedidosModule } from '../pedidos/pedidos.module.js';
@Module({
  imports: [
    AuthModule,
    UsuariosModule,
    ProductosModule,
    PedidosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
