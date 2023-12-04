import { Injectable, Logger } from '@nestjs/common';
import { NewCategoryDto } from './dto/new-category.dto';
import { CategoryModel } from './category.model';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  private logger = new Logger(CategoriesService.name);

  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async getAll(name: string = '') {
    return this.categoriesRepository.getAll(name);
  }

  async addNew(categoryDto: NewCategoryDto): Promise<CategoryModel> {
    return this.categoriesRepository.createNew(categoryDto);
  }

  getOneById(id: number): Promise<CategoryModel> {
    this.logger.debug(`Searching for category ${id}`);
    return this.categoriesRepository.getOneById(id);
  }

  async removeById(id: number): Promise<{ id: number; removed: number }> {
    return {
      id,
      removed: await this.categoriesRepository.deleteById(id),
    };
  }
}
