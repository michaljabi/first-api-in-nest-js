import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NewCategoryDto } from './dto/new-category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAll() {
    return this.categoriesService.getAll();
  }

  @Post()
  addNewCategory(@Body() payload: NewCategoryDto) {
    return this.categoriesService.addNew(payload);
  }

  @Get(':id')
  getSingleCategory(@Param('id') categoryId: number) {
    return this.categoriesService.getOneById(categoryId);
  }

  @Delete(':id')
  removeCategory(@Param('id') id: number) {
    return this.categoriesService.removeById(id);
  }
}
