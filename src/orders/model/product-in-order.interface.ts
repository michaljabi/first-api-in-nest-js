import { Product } from '../../product/products/product.interface';

export interface ProductInOrder {
  id: number;
  productId: Product['id'];
  quantity: number;
}
