import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Category } from './category.interface';
import { NewCategoryDto } from './dto/new-category.dto';
import type { Knex } from 'knex';

@Injectable()
export class CategoriesService {
  private logger = new Logger(CategoriesService.name);

  constructor(@Inject('DbConnection') private readonly knex: Knex) {}

  private async find(id: number): Promise<Category> {
    this.logger.debug(`Searching for category ${id}`);
    const category = await this.knex<Category>('categories')
      .where({ id })
      .first();
    if (!category) {
      throw new NotFoundException(`category with id: ${id} not found`);
    }
    return category;
  }

  getAll(): Promise<Category[]> {
    return this.knex<Category>('categories');
  }

  async addNew(categoryDto: NewCategoryDto): Promise<Category> {
    const [newOne] = await this.knex<Category>('categories').insert({
      ...categoryDto,
    });
    return this.getOneById(newOne);
  }

  getOneById(id: number): Promise<Category> {
    return this.find(id);
  }

  async removeById(id: number): Promise<{ id: number; removed: number }> {
    await this.getOneById(id);
    const removed = await this.knex('categories').where({ id }).delete();
    this.logger.log(`Removing category ${id}`);
    return { id, removed };
  }
}
