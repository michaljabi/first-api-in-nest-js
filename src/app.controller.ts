import { Controller, Get } from '@nestjs/common';

interface Category {
  id: number;
  name: string;
}

@Controller('categories')
export class AppController {
  private categories: Category[] = [
    { id: 1, name: 'Groceries' },
    { id: 2, name: 'Cosmetics' },
    { id: 3, name: 'Toys' },
    { id: 4, name: 'Dairy' },
    { id: 5, name: 'Fashion' },
    { id: 6, name: 'Electronics' },
    { id: 7, name: 'Games' },
  ];

  @Get()
  getAll(): Category[] {
    return this.categories;
  }

  @Get('cat/:catId')
  getMyCat() {
    return { name: 'Mruczek', id: 100 };
  }
}
