import { BaseModel } from '../../database/base-model';
import { CategoryModel } from '../categories/category.model';

export class ProductModel extends BaseModel {
  static tableName = 'products';

  readonly id: number;
  name: string;
  price: number;
  stock: number;
  imgUrl: string;
  categoryId: number;
  description?: string;

  static get relationMappings() {
    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: CategoryModel,
        join: {
          from: 'products.categoryId',
          to: 'categories.id',
        },
      },
    };
  }
}
