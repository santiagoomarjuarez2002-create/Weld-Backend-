import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { DetallePedidosService } from './detalle-pedidos.service.js';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto.js';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto.js';

@Controller('detalle-pedidos')
export class DetallePedidosController {
  constructor(private readonly detallePedidosService: DetallePedidosService) {}

  @Get()
  findAll() {
    return this.detallePedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.detallePedidosService.findOne(id);
  }

  @Post()
  create(@Body() createDetallePedidoDto: CreateDetallePedidoDto) {
    return this.detallePedidosService.create(createDetallePedidoDto);
  }

  @Put(':id')
  replace(
    @Param('id', ParseIntPipe) id: number,
    @Body() createDetallePedidoDto: CreateDetallePedidoDto,
  ) {
    return this.detallePedidosService.replace(id, createDetallePedidoDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetallePedidoDto: UpdateDetallePedidoDto,
  ) {
    return this.detallePedidosService.update(id, updateDetallePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.detallePedidosService.remove(id);
  }
}
