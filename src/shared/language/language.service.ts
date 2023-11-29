import { Injectable } from '@nestjs/common';

const DEFAULT_LANG = 'en';
const SUPPORTED_LANGUAGES = [DEFAULT_LANG, 'pl'] as const;

export type SupportedLanguages = (typeof SUPPORTED_LANGUAGES)[number];

@Injectable()
export class LanguageService {
  supportedLanguages() {
    return SUPPORTED_LANGUAGES;
  }
}
