import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SupportedLanguages } from '../shared/language/language.service';

export const ClientLanguage = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SupportedLanguages => {
    const request = ctx.switchToHttp().getRequest();
    return request.language;
  },
);
