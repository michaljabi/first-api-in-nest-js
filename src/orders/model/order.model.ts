import { BaseModel } from '../../database/base-model';
import { ProductModel } from '../../product/products/product.model';

export class OrderModel extends BaseModel {
  static tableName = 'orders';

  readonly id: number;
  title: string;
  madeAt: Date;
  status: 'OPENED' | 'IN_PROGRESS' | 'SHIPPED' | 'CLOSED';
  totalPrice: number;

  static get relationMappings() {
    return {
      products: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: ProductModel,
        join: {
          from: 'orders.id',
          through: {
            from: 'order_products.orderId',
            to: 'order_products.productId',
            extra: ['quantity'],
          },
          to: 'products.id',
        },
      },
    };
  }
}
