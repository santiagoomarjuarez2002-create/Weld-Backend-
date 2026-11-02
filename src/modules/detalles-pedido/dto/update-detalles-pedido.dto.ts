import { PartialType } from '@nestjs/mapped-types';
import { CreateDetallesPedidoDto } from './create-detalles-pedido.dto.js';

export class UpdateDetallesPedidoDto extends PartialType(CreateDetallesPedidoDto) {}
