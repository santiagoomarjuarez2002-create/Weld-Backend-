import { PartialType } from '@nestjs/mapped-types';
import { CreateProductosTalleDto } from './create-productos-talle.dto.js';

export class UpdateProductosTalleDto extends PartialType(CreateProductosTalleDto) {}
