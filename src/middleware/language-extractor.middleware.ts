import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LanguageExtractorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    req['language'] = req.headers['accept-language'] || 'en'; // fallback języka do en, jeśli żaden nie ustawiony
    next();
  }
}
