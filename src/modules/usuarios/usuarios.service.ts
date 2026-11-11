import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';

@Injectable()
export class UsuariosService {
  findAll() {
    return 'Esto muestra los usuarios';
  }

  findOne(_id: number) {
    return 'Esto muestra un usuario';
  }

  create(_dto: CreateUsuarioDto) {
    return 'Esto crea un usuario';
  }

  replace(_id: number, _dto: CreateUsuarioDto) {
    return 'Esto reemplaza un usuario';
  }

  update(_id: number, _dto: UpdateUsuarioDto) {
    return 'Esto actualiza parcialmente un usuario';
  }

  remove(_id: number) {
    return 'Esto elimina un usuario';
  }
}
