import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductsService } from '../product/products/products.service';

@Injectable()
export class OrdersService {
  constructor(private productsService: ProductsService) {}

  create(createOrderDto: CreateOrderDto) {
    for (const { id, quantity } of createOrderDto.products) {
      this.productsService.checkProductOnStock(id, quantity);
    }
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order ${updateOrderDto.products}`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
