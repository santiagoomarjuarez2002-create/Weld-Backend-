import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxDate,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductoDto {
  @IsString({ message: 'El nombre del producto debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres' })
  nombre: string;

  @IsString({ message: 'La descripción debe ser un texto' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  @MinLength(15, {
    message: 'La descripción debe tener al menos 15 caracteres',
  })
  @MaxLength(255, {
    message: 'La descripción no puede exceder los 255 caracteres',
  })
  descripcion: string;

  @IsDefined({ message: 'El precio es obligatorio' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número con hasta 2 decimales' },
  )
  @IsPositive({ message: 'El precio debe ser mayor que cero' })
  precio: number;

  @IsDefined({ message: 'La fecha es obligatoria' })
  @Type(() => Date)
  @IsDate({ message: 'La fecha debe ser válida' })
  @MaxDate(() => new Date(), { message: 'La fecha no puede ser futura' })
  fecha: Date;
}
