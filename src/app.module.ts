import { Module } from '@nestjs/common';
import { CategoriesController } from './categories/categories.controller';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { CategoriesService } from './categories/categories.service';
import { LoggerModule } from 'nestjs-pino';
import * as path from 'path';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
        useLevel: 'debug',
        transport: {
          target: path.resolve(__dirname, 'pino-pretty-config.js'),
        },
        quietReqLogger: true,
      },
    }),
  ],
  controllers: [CategoriesController, ProductsController],
  providers: [ProductsService, CategoriesService],
})
export class AppModule {}
