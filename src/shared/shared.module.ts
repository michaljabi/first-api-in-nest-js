import { Global, Module } from '@nestjs/common';
import { LanguageService } from './language/language.service';

@Global()
@Module({
  providers: [LanguageService],
  exports: [LanguageService],
})
export class SharedModule {}
