import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  Min,
} from 'class-validator';

export class CreateProductoDto {
  @IsString({ message: 'El nombre del producto debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(150, { message: 'El nombre no puede exceder los 150 caracteres' })
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

  @IsInt({ message: 'El stock del talle S debe ser un número entero' })
  @Min(0, { message: 'El stock del talle S no puede ser negativo' })
  stock_s: number;

  @IsInt({ message: 'El stock del talle M debe ser un número entero' })
  @Min(0, { message: 'El stock del talle M no puede ser negativo' })
  stock_m: number;

  @IsInt({ message: 'El stock del talle L debe ser un número entero' })
  @Min(0, { message: 'El stock del talle L no puede ser negativo' })
  stock_l: number;

  @IsInt({ message: 'El stock del talle XL debe ser un número entero' })
  @Min(0, { message: 'El stock del talle XL no puede ser negativo' })
  stock_xl: number;
}
