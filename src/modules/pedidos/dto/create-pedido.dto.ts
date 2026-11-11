import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDate,
  IsDefined,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxDate,
  MaxLength,
} from 'class-validator';

export class CreatePedidoDto {
  @IsInt({ message: 'El identificador del usuario debe ser entero' })
  @IsPositive({
    message: 'El identificador del usuario debe ser mayor que cero',
  })
  usuarioId: number;

  @IsArray({ message: 'Los productos deben ser un arreglo de identificadores' })
  @ArrayNotEmpty({ message: 'El pedido debe contener al menos un producto' })
  @ArrayUnique({
    message: 'Los identificadores de productos no deben repetirse',
  })
  @IsInt({
    each: true,
    message: 'Cada identificador de producto debe ser entero',
  })
  @IsPositive({
    each: true,
    message: 'Cada identificador debe ser mayor que cero',
  })
  productosIds: number[];

  @IsDefined({ message: 'La fecha del pedido es obligatoria' })
  @Type(() => Date)
  @IsDate({ message: 'La fecha del pedido debe ser válida' })
  @MaxDate(() => new Date(), {
    message: 'La fecha del pedido no puede ser futura',
  })
  fecha: Date;

  @IsOptional()
  @IsString({ message: 'Las observaciones deben ser un texto' })
  @MaxLength(500, {
    message: 'Las observaciones no pueden exceder los 500 caracteres',
  })
  observaciones?: string;
}
