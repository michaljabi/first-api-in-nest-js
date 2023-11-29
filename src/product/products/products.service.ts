import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { productList } from './product-list';
import { Product } from './product.interface';
import { NewProductDto } from './dto/new-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  private logger = new Logger(ProductsService.name);
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
    this.logger.log(`Created product with id: ${newProduct.id}`);
    return newProduct;
  }

  getAll(name: string = ''): readonly Product[] {
    return this.products.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  checkProductOnStock(id: number, quantity: number) {
    const product = this.findProduct(id);
    if (product.stock < quantity) {
      throw new BadRequestException(`Product :${id} is out of stock.`);
    }
    return true;
  }

  getOneById(id: number) {
    this.logger.verbose(`Read product id: ${id}`);
    this.logger.debug(`Read product id: ${id}`);
    this.logger.log(`Read product id: ${id}`);
    this.logger.warn(`Read product id: ${id}`);
    this.logger.error(`Read product id: ${id}`);
    this.logger.fatal(`Read product id: ${id}`);
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
