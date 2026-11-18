import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { UsuariosModule } from '../usuarios/usuarios.module.js';
import { ProductosModule } from '../productos/productos.module.js';
import { PedidosModule } from '../pedidos/pedidos.module.js';
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsuariosModule,
    ProductosModule,
    PedidosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
