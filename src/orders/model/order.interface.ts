import { ProductInOrder } from './product-in-order.interface';

export interface Order {
  id: number;
  madeAt: Date;
  products: ProductInOrder[];
  totalPrice: number;
}
