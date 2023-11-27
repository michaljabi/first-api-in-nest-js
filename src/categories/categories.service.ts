import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Category } from './category.interface';
import { categoriesList } from './categories-list';
import { NewCategoryDto } from './dto/new-category.dto';

@Injectable()
export class CategoriesService {
  private logger = new Logger(CategoriesService.name);
  private categories: Category[] = categoriesList;

  private generateNextId(): number {
    return Math.max(...this.categories.map((c) => c.id)) + 1;
  }

  private find(id: number): Category {
    this.logger.debug(`Searching for category ${id}`);
    const category = this.categories.find((c) => c.id === id);
    if (!category) {
      throw new NotFoundException(`category with id: ${id} not found`);
    }
    return category;
  }

  getAll(): readonly Category[] {
    return this.categories;
  }

  addNew(categoryDto: NewCategoryDto): Category {
    const category: Category = { id: this.generateNextId(), ...categoryDto };
    this.categories.push(category);
    return category;
  }

  getOneById(id: number): Category {
    return this.find(id);
  }

  removeById(id: number): { id: number; removed: boolean } {
    this.find(id);
    this.categories = this.categories.filter((c) => c.id !== id);
    this.logger.log(`Removing category ${id}`);
    return { id, removed: true };
  }
}
