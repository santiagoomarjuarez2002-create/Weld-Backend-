import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductosTallesService } from './productos-talles.service.js';
import { CreateProductosTalleDto } from './dto/create-productos-talle.dto.js';
import { UpdateProductosTalleDto } from './dto/update-productos-talle.dto.js';

@Controller('productos-talles')
export class ProductosTallesController {
  constructor(private readonly productosTallesService: ProductosTallesService) {}

  @Post()
  create(@Body() createProductosTalleDto: CreateProductosTalleDto) {
    return this.productosTallesService.create(createProductosTalleDto);
  }

  @Get()
  findAll() {
    return this.productosTallesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosTallesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductosTalleDto: UpdateProductosTalleDto) {
    return this.productosTallesService.update(+id, updateProductosTalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosTallesService.remove(+id);
  }
}
