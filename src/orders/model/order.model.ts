import { BaseModel } from '../../database/base-model';

export class OrderModel extends BaseModel {
  static tableName = 'orders';

  readonly id: number;
  title: string;
  madeAt: Date;
  status: 'OPENED' | 'IN_PROGRESS' | 'SHIPPED' | 'CLOSED';
  totalPrice: number;

  static get relationMappings() {
    return {
      // products: {},
    };
  }
}
