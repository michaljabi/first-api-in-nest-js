import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NewProductDto } from './dto/new-product.dto';
import { Product } from './product.interface';
import { UpdateProductDto } from './dto/update-product.dto';

/* eslint-disable @typescript-eslint/no-unused-vars */

@Controller('products')
export class ProductsController {
  @Post()
  addNew(@Body() product: NewProductDto): Product {
    return {} as Product;
  }

  @Get()
  getAll(): Product[] {
    return [];
  }

  @Get(':productId')
  getOne(@Param('productId') productId: number): Product {
    return {} as Product;
  }

  @Patch(':productId')
  update(
    @Param('productId') productId: number,
    @Body() product: UpdateProductDto,
  ): Product {
    return {} as Product;
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('productId') productId: number): void {}
}
