import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class CookieCheckMiddleware implements NestMiddleware {
  private logger = new Logger(CookieCheckMiddleware.name);

  use(req: Request, res: Response, next: () => void) {
    this.logger.debug('Checking if cookie set for request....');
    const [cookieEntry] = req.headers['set-cookie'] || [];
    if (cookieEntry) {
      this.logger.warn(`Got cookie: ${cookieEntry}`);
    }
    next();
  }
}
