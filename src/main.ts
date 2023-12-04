import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogLevel, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as process from 'process';

async function bootstrap() {
  const { PORT, LOG_LEVEL } = process.env;
  const app = await NestFactory.create(AppModule, {
    logger: [LOG_LEVEL as LogLevel],
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const logger = app.get(Logger);
  app.useLogger(app.get(Logger));
  await app.listen(PORT);
  logger.log(`Server is running on http://localhost:${PORT}`);
}
bootstrap();
