import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import * as path from 'path';
import { APP_FILTER } from '@nestjs/core';
import { AllErrorsFilter } from './errors/all-errors.filter';
import { CookieCheckMiddleware } from './middleware/cookie-check.middleware';
import { LanguageExtractorMiddleware } from './middleware/language-extractor.middleware';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';
import { SharedModule } from './shared/shared.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: async () => ({
        pinoHttp: {
          level: process.env.LOG_LEVEL,
          useLevel: 'debug',
          transport: {
            target: path.resolve(__dirname, 'pino-pretty-config.js'),
          },
          quietReqLogger: true,
        },
      }),
    }),
    ProductModule,
    OrdersModule,
    SharedModule,
    DatabaseModule,
    ConfigModule.forRoot(),
  ],
  providers: [
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
