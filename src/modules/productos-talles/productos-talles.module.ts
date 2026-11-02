import { Module } from '@nestjs/common';
import { ProductosTallesService } from './productos-talles.service.js';
import { ProductosTallesController } from './productos-talles.controller.js';

@Module({
  controllers: [ProductosTallesController],
  providers: [ProductosTallesService],
})
export class ProductosTallesModule {}
