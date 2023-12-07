import { LanguageExtractorMiddleware } from './language-extractor.middleware';
import { Test, TestingModule } from '@nestjs/testing';
import { LanguageService } from '../shared/language/language.service';

describe('LanguageExtractorMiddleware', () => {
  let middleware: LanguageExtractorMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: LanguageService,
          useValue: {
            supportedLanguages: jest.fn().mockReturnValue(['en']),
          },
        },
        LanguageExtractorMiddleware,
      ],
    }).compile();

    middleware = module.get(LanguageExtractorMiddleware);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });
});
