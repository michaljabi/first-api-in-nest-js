import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ModelClass } from 'objection';
import { CategoryModel } from './category.model';
import { NewCategoryDto } from './dto/new-category.dto';

// Rozwiązanie zadania 12.6
@Injectable()
export class CategoriesRepository {
  private logger = new Logger(CategoriesRepository.name);

  constructor(
    @Inject('CategoryModel')
    private readonly categoryModel: ModelClass<CategoryModel>,
  ) {}

  async createNew(categoryDto: NewCategoryDto) {
    try {
      return await this.categoryModel.query().insert({
        ...categoryDto,
      });
    } catch (error) {
      if (error?.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new BadRequestException(
          `Category named "${categoryDto.name}" already exist`,
        );
      }
      throw error;
    }
  }

  async getOneById(id: number): Promise<CategoryModel> {
    this.logger.debug(`Searching for category ${id}`);
    return this.categoryModel
      .query()
      .findById(id)
      .throwIfNotFound(`category with id: ${id} not found`);
  }

  async getAll(name: string = '') {
    return this.categoryModel.query().whereLike('name', `%${name}%`);
  }

  async deleteById(id: number) {
    await this.getOneById(id);
    this.logger.log(`Removing category ${id}`);
    return this.categoryModel.query().deleteById(id);
  }
}
