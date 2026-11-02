import { Module } from '@nestjs/common';
import { ImagenesProductoService } from './imagenes-producto.service.js';
import { ImagenesProductoController } from './imagenes-producto.controller.js';

@Module({
  controllers: [ImagenesProductoController],
  providers: [ImagenesProductoService],
})
export class ImagenesProductoModule {}
