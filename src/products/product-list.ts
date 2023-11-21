import { Product } from './product.interface';

export const productList: Product[] = [
  {
    id: 1,
    name: 'Zestaw biznesmena',
    price: 1899.99,
    image: 'https://picsum.photos/id/26/4209/2769',
    stock: 1,
  },
  {
    id: 2,
    name: 'Książka kucharska',
    price: 5.56,
    description: 'Kuchnia śródziemnomorska',
    image: 'https://picsum.photos/id/24/4855/1803',
    stock: 65,
  },
  {
    id: 3,
    name: 'Części do aparatu',
    price: 980,
    description: 'Wszystkie elementy w komplecie. Brakuje śrubek',
    image: 'https://picsum.photos/id/36/4179/2790',
    stock: 2,
  },
  {
    id: 4,
    name: 'Gramofon',
    price: 450,
    image: 'https://picsum.photos/id/39/3456/2304',
    stock: 20,
  },
  {
    id: 5,
    name: 'Głośnik bluetooth',
    price: 340,
    description:
      'Świetnie prezentuje się na stole, dodatkowo posiada wyjście AUX!',
    image: 'https://picsum.photos/id/529/4000/3000',
    stock: 3,
  },
];
