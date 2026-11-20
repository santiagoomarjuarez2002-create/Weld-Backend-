import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { hashPassword } from '../auth/password.util.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.usuarios.findMany({ omit: { password_hash: true } });
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { id },
      omit: { password_hash: true },
    });

    if (!usuario) {
      throw new NotFoundException(`No existe un usuario con id ${id}.`);
    }

    return usuario;
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { password, ...datosUsuario } = createUsuarioDto;
    const password_hash = await hashPassword(password);

    try {
      return await this.prisma.usuarios.create({
        data: {
          ...datosUsuario,
          password_hash,
        },
        omit: { password_hash: true },
      });
    } catch (error) {
      this.handleWriteError(error);
    }
  }

  async replace(id: number, replaceUsuarioDto: CreateUsuarioDto) {
    await this.findOne(id);
    const { password, ...datosUsuario } = replaceUsuarioDto;
    const password_hash = await hashPassword(password);

    try {
      return await this.prisma.usuarios.update({
        where: { id },
        data: { ...datosUsuario, password_hash },
        omit: { password_hash: true },
      });
    } catch (error) {
      this.handleWriteError(error, id);
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id);

    try {
      return await this.prisma.usuarios.update({
        where: { id },
        data: updateUsuarioDto,
        omit: { password_hash: true },
      });
    } catch (error) {
      this.handleWriteError(error, id);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.usuarios.delete({
        where: { id },
        omit: { password_hash: true },
      });
    } catch (error) {
      this.handleWriteError(error, id);
    }
  }

  private handleWriteError(error: unknown, id?: number): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        throw new ConflictException(
          'La operación entra en conflicto con registros relacionados.',
        );
      }

      if (error.code === 'P2002') {
        throw new ConflictException(
          'Ya existe una cuenta con ese correo electrónico.',
        );
      }

      if (error.code === 'P2025' && id !== undefined) {
        throw new NotFoundException(`No existe un usuario con id ${id}.`);
      }
    }

    throw error;
  }
}
