import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NewProductDto } from './dto/new-product.dto';
import { Product } from './product.interface';
import { UpdateProductDto } from './dto/update-product.dto';
import { productList } from './product-list';

@Controller('products')
export class ProductsController {
  private productId: number = productList.length;
  private products: Product[] = productList;

  findProduct(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
    return product;
  }

  @Post()
  addNew(@Body() product: NewProductDto): Product {
    const newProduct: Product = {
      id: this.productId++,
      stock: 0,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  @Get()
  getAll(): Product[] {
    return this.products;
  }

  @Get(':productId')
  getOne(@Param('productId') productId: number): Product {
    return this.findProduct(productId);
  }

  @Patch(':productId')
  update(
    @Param('productId') productId: number,
    @Body() product: UpdateProductDto,
  ): Product {
    const productToUpdate = this.findProduct(productId);
    Object.assign(productToUpdate, product);
    return productToUpdate;
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('productId') productId: number): void {
    this.findProduct(productId);
    this.products = this.products.filter((p) => p.id !== productId);
  }
}
