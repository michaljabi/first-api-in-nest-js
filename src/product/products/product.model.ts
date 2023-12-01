import { Model } from 'objection';

export class ProductModel extends Model {
  static tableName = 'products';

  readonly id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
  description?: string;
}
