import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CategoriesController } from './categories/categories.controller';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { CategoriesService } from './categories/categories.service';
import { LoggerModule } from 'nestjs-pino';
import * as path from 'path';
import { APP_FILTER } from '@nestjs/core';
import { AllErrorsFilter } from './errors/all-errors.filter';
import { CookieCheckMiddleware } from './middleware/cookie-check.middleware';
import { LanguageExtractorMiddleware } from './middleware/language-extractor.middleware';

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
  providers: [
    ProductsService,
    CategoriesService,
    {
      provide: APP_FILTER,
      useClass: AllErrorsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LanguageExtractorMiddleware, CookieCheckMiddleware)
      .forRoutes('*');
  }
}
