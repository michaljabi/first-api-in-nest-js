import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { NewCategoryDto } from './dto/new-category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  private logger = new Logger(CategoriesController.name);
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAll() {
    this.logger.debug(`getAll categories (GET)`);
    return this.categoriesService.getAll();
  }

  @Post()
  addNewCategory(@Body() payload: NewCategoryDto) {
    return this.categoriesService.addNew(payload);
  }

  @Get(':id')
  getSingleCategory(@Param('id', ParseIntPipe) categoryId: number) {
    return this.categoriesService.getOneById(categoryId);
  }

  @Delete(':id')
  removeCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.removeById(id);
  }
}
