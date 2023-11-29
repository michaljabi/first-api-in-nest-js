import { ProductInOrder } from './product-in-order.interface';

export interface Order {
  id: number;
  madeAt: Date;
  products: ProductInOrder[];
  status: 'OPENED' | 'IN_PROGRESS' | 'SHIPPED' | 'CLOSED';
  totalPrice: number;
}
