import { BaseModel } from '../../database/base-model';

export class ProductModel extends BaseModel {
  static tableName = 'products';

  readonly id: number;
  name: string;
  price: number;
  stock: number;
  imgUrl: string;
  categoryId: number;
  description?: string;
}
