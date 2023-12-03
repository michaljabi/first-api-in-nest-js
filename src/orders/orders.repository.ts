import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { OrderModel } from './model/order.model';
import { OrderedProduct } from './dto/create-order.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @Inject('OrderModel')
    private readonly orderModel: ModelClass<OrderModel>,
  ) {}

  async createNewWithProductList(
    order: Pick<OrderModel, 'title' | 'totalPrice'>,
    products: OrderedProduct[],
  ) {
    const newOrder = await this.orderModel.query().insert(order);
    for (const product of products) {
      await newOrder.$relatedQuery('products').relate(product);
    }
    return newOrder;
  }

  async getAll() {
    return this.orderModel.query().withGraphFetched('products');
  }

  async getOneByIdWithProducts(id: number) {
    return this.orderModel
      .query()
      .findById(id)
      .withGraphFetched('products')
      .throwIfNotFound(`Order with id: ${id} not found!`);
  }

  async countAllOrdersFromYear(year: number) {
    return this.orderModel
      .query()
      .whereBetween('madeAt', [
        `${year}-01-01 00:00:00`,
        `${year + 1}-01-01 00:00:00`,
      ])
      .resultSize();
  }
}
