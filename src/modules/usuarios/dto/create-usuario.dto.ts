import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
  nombre: string;

  @IsEmail({}, { message: 'El email debe ser un correo electrónico válido' })
  @MaxLength(254, { message: 'El email no puede exceder los 254 caracteres' })
  email: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @MaxLength(128, {
    message: 'La contraseña no puede exceder los 128 caracteres',
  })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula, un número y un símbolo',
    },
  )
  password: string;

  @IsOptional()
  @IsString({ message: 'La dirección debe ser un texto' })
  @Length(5, 255, {
    message: 'La dirección debe tener entre 5 y 255 caracteres',
  })
  direccion?: string;
}
