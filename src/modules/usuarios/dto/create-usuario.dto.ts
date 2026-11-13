import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres' })
  nombre: string;

  @IsString({ message: 'El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  @MaxLength(100, {
    message: 'El apellido no puede exceder los 100 caracteres',
  })
  apellido: string;

  @IsString({ message: 'El teléfono debe ser un texto' })
  @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
  @MaxLength(15, { message: 'El teléfono no puede exceder los 15 caracteres' })
  telefono: string;

  @IsString({ message: 'El DNI debe ser un texto' })
  @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
  @MaxLength(10, { message: 'El DNI no puede exceder los 10 caracteres' })
  dni: string;

  @IsString({ message: 'La provincia debe ser un texto' })
  @IsNotEmpty({ message: 'La provincia no puede estar vacía' })
  @MaxLength(100, { message: 'La provincia no puede exceder los 100 caracteres' })
  provincia: string;

  @IsString({ message: 'La localidad debe ser un texto' })
  @IsNotEmpty({ message: 'La localidad no puede estar vacía' })
  @MaxLength(100, { message: 'La localidad no puede exceder los 100 caracteres' })
  localidad: string;

  @IsString({ message: 'La dirección debe ser un texto' })
  @IsNotEmpty({ message: 'La dirección no puede estar vacía' })
  @MaxLength(100, {
    message: 'La dirección no puede exceder los 100 caracteres',
  })
  direccion: string;

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
}
