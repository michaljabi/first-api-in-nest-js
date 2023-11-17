import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Goodbye world';
  }

  @Get('cat/100')
  getMyCat() {
    return { name: 'Mruczek', id: 100 };
  }
}
