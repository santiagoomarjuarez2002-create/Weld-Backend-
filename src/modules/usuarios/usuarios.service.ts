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

const usuarioSelect = {
  id: true,
  nombre: true,
  apellido: true,
  telefono: true,
  dni: true,
  provincia: true,
  localidad: true,
  direccion: true,
  email: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.usuariosSelect;

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.usuarios.findMany({ select: usuarioSelect });
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { id },
      select: usuarioSelect,
    });

    if (!usuario) {
      throw new NotFoundException(`No existe un usuario con id ${id}.`);
    }

    return usuario;
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const {
      nombre,
      apellido,
      telefono,
      dni,
      provincia,
      localidad,
      direccion,
      email,
      password,
    } = createUsuarioDto;
    const password_hash = await hashPassword(password);

    try {
      return await this.prisma.usuarios.create({
        data: {
          nombre,
          apellido,
          telefono,
          dni,
          provincia,
          localidad,
          direccion,
          email,
          password_hash,
        },
        select: usuarioSelect,
      });
    } catch (error) {
      this.handleWriteError(error);
    }
  }

  async replace(id: number, createUsuarioDto: CreateUsuarioDto) {
    const passwordHash = await hashPassword(createUsuarioDto.password);
    return this.saveUpdate(id, createUsuarioDto, passwordHash);
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.saveUpdate(id, updateUsuarioDto);
  }

  private async saveUpdate(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
    passwordHash?: string,
  ) {
    const {
      nombre,
      apellido,
      telefono,
      dni,
      provincia,
      localidad,
      direccion,
      email,
    } = updateUsuarioDto;

    try {
      return await this.prisma.usuarios.update({
        where: { id },
        data: {
          nombre: nombre ?? undefined,
          apellido: apellido ?? undefined,
          telefono: telefono ?? undefined,
          dni: dni ?? undefined,
          provincia: provincia ?? undefined,
          localidad: localidad ?? undefined,
          direccion: direccion ?? undefined,
          email: email ?? undefined,
          password_hash: passwordHash,
        },
        select: usuarioSelect,
      });
    } catch (error) {
      this.handleWriteError(error, id);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.usuarios.delete({
        where: { id },
        select: usuarioSelect,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new ConflictException('El usuario tiene pedidos asociados.');
      }

      this.handleWriteError(error, id);
    }
  }

  private handleWriteError(error: unknown, id?: number): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
