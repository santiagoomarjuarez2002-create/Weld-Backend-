import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetallesPedidoService } from './detalles-pedido.service.js';
import { CreateDetallesPedidoDto } from './dto/create-detalles-pedido.dto.js';
import { UpdateDetallesPedidoDto } from './dto/update-detalles-pedido.dto.js';

@Controller('detalles-pedido')
export class DetallesPedidoController {
  constructor(private readonly detallesPedidoService: DetallesPedidoService) {}

  @Post()
  create(@Body() createDetallesPedidoDto: CreateDetallesPedidoDto) {
    return this.detallesPedidoService.create(createDetallesPedidoDto);
  }

  @Get()
  findAll() {
    return this.detallesPedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallesPedidoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetallesPedidoDto: UpdateDetallesPedidoDto) {
    return this.detallesPedidoService.update(+id, updateDetallesPedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallesPedidoService.remove(+id);
  }
}
