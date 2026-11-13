import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePedidoDto {
  @IsInt()
  @Min(1)
  usuario_id!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  direccion_envio!: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El costo de envío debe ser un número con hasta 2 decimales' },
  )
  @Min(0, { message: 'El costo de envío no puede ser negativo' })
  costo_envio!: number;
}