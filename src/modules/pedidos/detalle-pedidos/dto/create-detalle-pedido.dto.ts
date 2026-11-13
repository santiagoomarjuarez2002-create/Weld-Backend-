import {
  IsInt,
  IsIn,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateDetallePedidoDto {
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @IsPositive({ message: 'La cantidad debe ser mayor que cero' })
  cantidad: number;

  @IsIn(['S', 'M', 'L', 'XL'], {
    message: 'El talle debe ser S, M, L o XL',
  })
  talle: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio unitario debe ser un número con hasta 2 decimales' },
  )
  @IsPositive({ message: 'El precio unitario debe ser mayor que cero' })
  precio_unitario: number;
}
