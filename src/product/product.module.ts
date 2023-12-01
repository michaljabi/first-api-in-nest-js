import { Module } from '@nestjs/common';
import { CategoriesController } from './categories/categories.controller';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { CategoriesService } from './categories/categories.service';
import { ProductModel } from './products/product.model';

@Module({
  controllers: [CategoriesController, ProductsController],
  providers: [
    ProductsService,
    CategoriesService,
    {
      provide: 'ProductModel',
      useValue: ProductModel,
    },
  ],
  exports: [ProductsService],
})
export class ProductModule {}
