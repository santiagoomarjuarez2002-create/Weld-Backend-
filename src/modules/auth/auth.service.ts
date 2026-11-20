import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service.js';
import { UsuariosService } from '../usuarios/usuarios.service.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import { RegisterAuthDto } from './dto/register-auth.dto.js';
import { verifyPassword } from './password.util.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usuariosService: UsuariosService,
  ) {}

  register(registerAuthDto: RegisterAuthDto) {
    return this.usuariosService.create(registerAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { email: loginAuthDto.email },
    });

    if (
      !usuario ||
      !(await verifyPassword(loginAuthDto.password, usuario.password_hash))
    ) {
      throw new UnauthorizedException('Correo o contraseña incorrectos.');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: usuario.id,
      email: usuario.email,
    });

    return {
      access_token: accessToken,
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        createdAt: usuario.createdAt,
        updatedAt: usuario.updatedAt,
      },
    };
  }
}
