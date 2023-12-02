import { BaseModel } from '../../database/base-model';

export class CategoryModel extends BaseModel {
  static tableName = 'categories';

  readonly id: number;
  name: string;
}
