import { LanguageExtractorMiddleware } from './language-extractor.middleware';

describe('LanguageExtractorMiddleware', () => {
  it('should be defined', () => {
    expect(new LanguageExtractorMiddleware()).toBeDefined();
  });
});
