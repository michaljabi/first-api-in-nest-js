import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { NewCategoryDto } from './dto/new-category.dto';
import { Category } from './category.interface';
import { categoriesList } from './categories-list';

@Controller('categories')
export class CategoriesController {
  private categories: Category[] = categoriesList;
  private nextId = 8;

  // rozwiązane zadanie 4.6:
  findOneCategoryById(id: number): Category {
    const category = this.categories.find((c) => c.id === id);
    if (!category) {
      throw new NotFoundException(`category with id: ${id} not found`);
    }
    return category;
  }

  @Get()
  getAll(): Category[] {
    return this.categories;
  }

  @Post()
  addNewCategory(@Body() payload: NewCategoryDto) {
    const category: Category = { id: this.nextId++, ...payload };
    this.categories.push(category);
    return category;
  }

  @Get(':id')
  getSingleCategory(@Param('id') categoryId: number) {
    return this.findOneCategoryById(categoryId);
  }

  // rozwiązane zadanie 3.7:
  @Delete(':id')
  removeCategory(@Param('id') id: number) {
    this.findOneCategoryById(id);
    this.categories = this.categories.filter((c) => c.id !== id);
    return { id, removed: true };
  }
}
