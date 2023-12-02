import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NewCategoryDto } from './dto/new-category.dto';
import { ModelClass } from 'objection';
import { CategoryModel } from './category.model';

@Injectable()
export class CategoriesService {
  private logger = new Logger(CategoriesService.name);

  constructor(
    @Inject('CategoryModel')
    private readonly categoryModel: ModelClass<CategoryModel>,
  ) {}

  private async find(id: number): Promise<CategoryModel> {
    this.logger.debug(`Searching for category ${id}`);
    return this.categoryModel
      .query()
      .findById(id)
      .throwIfNotFound(`category with id: ${id} not found`);
  }

  async getAll(name: string = '') {
    return this.categoryModel.query().whereLike('name', `%${name}%`);
  }

  async addNew(categoryDto: NewCategoryDto): Promise<CategoryModel> {
    try {
      return await this.categoryModel.query().insert({
        ...categoryDto,
      });
    } catch (error) {
      this.logger.log(error.constructor.name);
      if (error?.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new BadRequestException(
          `Category named "${categoryDto.name}" already exist`,
        );
      }
      throw error;
    }
  }

  getOneById(id: number): Promise<CategoryModel> {
    return this.find(id);
  }

  async removeById(id: number): Promise<{ id: number; removed: number }> {
    await this.getOneById(id);
    const removed = await this.categoryModel.query().deleteById(id);
    this.logger.log(`Removing category ${id}`);
    return { id, removed };
  }
}
