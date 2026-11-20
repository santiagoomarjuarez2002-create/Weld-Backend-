import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto.js';

export class UpdateUsuarioDto extends PartialType(
  PickType(CreateUsuarioDto, [
    'nombre',
    'apellido',
    'telefono',
    'dni',
    'provincia',
    'localidad',
    'direccion',
    'email',
  ] as const),
) {}
