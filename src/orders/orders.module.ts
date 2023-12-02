import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductModule } from '../product/product.module';
import { OrderModel } from './model/order.model';

@Module({
  imports: [ProductModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: 'OrderModel',
      useValue: OrderModel,
    },
  ],
})
export class OrdersModule {}
