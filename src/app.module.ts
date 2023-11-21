import { Module } from '@nestjs/common';
import { CategoriesController } from './categories/categories.controller';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [],
  controllers: [CategoriesController, ProductsController],
  providers: [],
})
export class AppModule {}
