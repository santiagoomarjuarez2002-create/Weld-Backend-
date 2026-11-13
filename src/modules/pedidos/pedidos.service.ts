import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto.js';
import { UpdatePedidoDto } from './dto/update-pedido.dto.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class PedidosService {
  constructor(private readonly prisma: PrismaService) {}

 findAll() {
     return this.prisma.pedidos.findMany();
   }
 
   async findOne(id: number) {
     const pedido = await this.prisma.pedidos.findUnique({ where: { id } });
 
       if (!pedido) {
       throw new NotFoundException(`No existe un pedido con id ${id}.`);
     }
 
     return pedido;
   }
 
   async create(createPedidoDto: CreatePedidoDto) {
     return this.prisma.pedidos.create({ data: createPedidoDto });
   }
 
 
   async update(id: number, dto: UpdatePedidoDto) {
     await this.findOne(id);
      return this.prisma.pedidos.update({ where: { id }, data: dto });
   }
 
   async replace(id: number, dto: CreatePedidoDto) {
   await this.findOne(id);
 
   return await this.prisma.pedidos.update({
     where: { id },
     data: dto,
   });
 }
 
   async remove(id: number) {
     await this.findOne(id);
     return this.prisma.pedidos.delete({ where: { id } });
   }
 }