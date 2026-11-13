import { IsNumber, Min } from 'class-validator';

export class CreatePedidoDto {
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El costo de envío debe ser un número con hasta 2 decimales' },
  )
  @Min(0, { message: 'El costo de envío no puede ser negativo' })
  costo_envio: number;
}
