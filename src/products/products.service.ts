import { Injectable, NotFoundException } from '@nestjs/common';
import { productList } from './product-list';
import { Product } from './product.interface';
import { NewProductDto } from './dto/new-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  private products: Product[] = productList;

  constructor(private categoriesService: CategoriesService) {}

  // rozwiązane zadanie 6.9
  private generateNextId(): number {
    return Math.max(...this.products.map((c) => c.id)) + 1;
  }

  private findProduct(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
    return product;
  }

  createNew(product: NewProductDto): Product {
    this.categoriesService.getOneById(product.categoryId);
    const newProduct: Product = {
      id: this.generateNextId(),
      stock: 0,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  getAll(name: string = ''): readonly Product[] {
    return this.products.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  getOneById(id: number) {
    return this.findProduct(id);
  }

  update(id: number, partialProduct: UpdateProductDto) {
    // rozwiązane zadanie 6.9
    if (partialProduct.categoryId) {
      this.categoriesService.getOneById(partialProduct.categoryId);
    }
    const productToUpdate = this.findProduct(id);
    Object.assign(productToUpdate, partialProduct);
    return productToUpdate;
  }

  removeById(id: number): void {
    this.findProduct(id);
    this.products = this.products.filter((p) => p.id !== id);
  }
}
