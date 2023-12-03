import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductModule } from '../product/product.module';
import { OrderModel } from './model/order.model';
import { OrdersRepository } from './orders.repository';

@Module({
  imports: [ProductModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    {
      provide: 'OrderModel',
      useValue: OrderModel,
    },
  ],
})
export class OrdersModule {}
