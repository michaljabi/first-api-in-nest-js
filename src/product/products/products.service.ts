import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './product.interface';
import { NewProductDto } from './dto/new-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from '../categories/categories.service';
import type { Knex } from 'knex';
import { Category } from '../categories/category.interface';

@Injectable()
export class ProductsService {
  private logger = new Logger(ProductsService.name);

  constructor(
    private categoriesService: CategoriesService,
    @Inject('DbConnection') private readonly knex: Knex,
  ) {}

  private async findProduct(id: number) {
    const product = await this.knex<Product>('products').where({ id }).first();
    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
    return product;
  }

  async createNew(product: NewProductDto): Promise<Product> {
    await this.categoriesService.getOneById(product.categoryId);
    const [newOne] = await this.knex<Category>('products').insert({
      stock: 0,
      ...product,
    });
    const newProduct = await this.findProduct(newOne);
    this.logger.log(`Created product with id: ${newProduct.id}`);
    return newProduct;
  }

  async getAll(name: string = ''): Promise<Product[]> {
    const query = this.knex<Product>('products');
    if (name) {
      query.whereLike('name', `%${name}%`);
    }
    return query;
  }

  async checkProductOnStock(id: number, quantity: number) {
    const product = await this.findProduct(id);
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

  async update(id: number, partialProduct: UpdateProductDto) {
    // rozwiązane zadanie 6.9
    if (partialProduct.categoryId) {
      await this.categoriesService.getOneById(partialProduct.categoryId);
    }
    await this.knex<Product>('products').where({ id }).update(partialProduct);
    return this.findProduct(id);
  }

  async removeById(id: number) {
    await this.findProduct(id);
    return this.knex<Product>('products').where({ id }).del();
  }
}
