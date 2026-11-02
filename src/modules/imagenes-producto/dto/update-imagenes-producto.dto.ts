import { PartialType } from '@nestjs/mapped-types';
import { CreateImagenesProductoDto } from './create-imagenes-producto.dto.js';

export class UpdateImagenesProductoDto extends PartialType(CreateImagenesProductoDto) {}
