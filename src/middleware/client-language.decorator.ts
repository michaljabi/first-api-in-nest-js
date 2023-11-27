import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type AcceptableLanguages = 'en' | 'pl';

export const ClientLanguage = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AcceptableLanguages => {
    const request = ctx.switchToHttp().getRequest();
    return request.language;
  },
);
