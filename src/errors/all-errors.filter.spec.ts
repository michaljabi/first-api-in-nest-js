import { AllErrorsFilter } from './all-errors.filter';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

describe('AllErrorsFilter', () => {
  let filter: AllErrorsFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: {},
        },
        AllErrorsFilter,
      ],
    }).compile();

    filter = module.get(AllErrorsFilter);
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });
});
