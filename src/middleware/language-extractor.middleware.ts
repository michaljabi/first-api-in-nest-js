import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

// 8.8.4 biblioteka obsługująca (q-factor weighting)
import acceptLanguage from 'accept-language';
// fallback języka do en, jeśli żaden nieustawiony (bo en pierwszy!)
acceptLanguage.languages(['en', 'pl']);

@Injectable()
export class LanguageExtractorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    req['language'] = acceptLanguage.get(req.headers['accept-language']);
    next();
  }
}
