import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';

@Injectable()
export class AuthService {
  findAll() {
    return 'Esto muestra las autenticaciones';
  }

  findOne(_id: number) {
    return 'Esto muestra una autenticación';
  }

  create(_dto: CreateAuthDto) {
    return 'Esto crea una autenticación';
  }

  replace(_id: number, _dto: CreateAuthDto) {
    return 'Esto reemplaza una autenticación';
  }

  update(_id: number, _dto: UpdateAuthDto) {
    return 'Esto actualiza parcialmente una autenticación';
  }

  remove(_id: number) {
    return 'Esto elimina una autenticación';
  }
}
