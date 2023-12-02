import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../product/products/products.service';
import { ModelClass } from 'objection';
import { OrderModel } from './model/order.model';

@Injectable()
export class OrdersService {
  constructor(
    private productsService: ProductsService,
    @Inject('OrderModel')
    private readonly orderModel: ModelClass<OrderModel>,
  ) {}

  // To nie jest doskonałe 🪲!!
  // Bo co jeśli usunę zamówienie z danego roku?!
  private async generateNextTitle() {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const allOrdersFromThisYear = await this.orderModel
      .query()
      .whereBetween('madeAt', [
        `${currentYear}-01-01 00:00:00`,
        `${nextYear}-01-01 00:00:00`,
      ])
      .resultSize();
    const nextOrderNumber = allOrdersFromThisYear + 1;
    return `${nextOrderNumber}/${currentYear}`;
  }

  async create(createOrderDto: CreateOrderDto) {
    let totalPrice = 0;
    for (const { id, quantity } of createOrderDto.products) {
      const product = await this.productsService.checkProductOnStock(
        id,
        quantity,
      );
      totalPrice += product.price * quantity;
    }
    return this.orderModel.query().insert({
      title: await this.generateNextTitle(),
      totalPrice,
    });
  }

  findAll() {
    return this.orderModel.query();
  }

  findOne(id: number) {
    return this.orderModel
      .query()
      .findById(id)
      .throwIfNotFound(`Order with id: ${id} not found!`);
  }
}
