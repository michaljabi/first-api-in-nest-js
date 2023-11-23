import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './category.interface';
import { categoriesList } from './categories-list';
import { NewCategoryDto } from './dto/new-category.dto';

@Injectable()
export class CategoriesService {
  private categories: Category[] = categoriesList;
  private nextId = 8;

  private find(id: number): Category {
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
    const category: Category = { id: this.nextId++, ...categoryDto };
    this.categories.push(category);
    return category;
  }

  getOneById(id: number): Category {
    return this.find(id);
  }

  removeById(id: number): { id: number; removed: boolean } {
    this.find(id);
    this.categories = this.categories.filter((c) => c.id !== id);
    return { id, removed: true };
  }
}
