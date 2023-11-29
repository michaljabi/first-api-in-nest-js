import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

// 8.8.4 biblioteka obsługująca (q-factor weighting)
import acceptLanguage from 'accept-language';
import { LanguageService } from '../shared/language/language.service';

@Injectable()
export class LanguageExtractorMiddleware implements NestMiddleware {
  constructor(languageService: LanguageService) {
    acceptLanguage.languages(
      languageService.supportedLanguages() as unknown as string[],
    );
  }

  use(req: Request, res: Response, next: () => void) {
    req['language'] = acceptLanguage.get(req.headers['accept-language']);
    next();
  }
}
