import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('products').del();

  // Inserts seed entries
  await knex('products').insert([
    {
      id: 1,
      name: 'Zestaw biznesmena',
      price: 1899.99,
      img_url: 'https://picsum.photos/id/26/4209/2769',
      stock: 1,
      category_id: 5,
    },
    {
      id: 2,
      name: 'Książka kucharska',
      price: 5.56,
      description: 'Kuchnia śródziemnomorska',
      img_url: 'https://picsum.photos/id/24/4855/1803',
      stock: 65,
      category_id: 1,
    },
    {
      id: 3,
      name: 'Części do aparatu',
      price: 980,
      description: 'Wszystkie elementy w komplecie. Brakuje śrubek',
      img_url: 'https://picsum.photos/id/36/4179/2790',
      stock: 2,
      category_id: 6,
    },
    {
      id: 4,
      name: 'Gramofon',
      price: 450,
      img_url: 'https://picsum.photos/id/39/3456/2304',
      stock: 20,
      category_id: 6,
    },
    {
      id: 5,
      name: 'Głośnik bluetooth',
      price: 340,
      description:
        'Świetnie prezentuje się na stole, dodatkowo posiada wyjście AUX!',
      img_url: 'https://picsum.photos/id/529/4000/3000',
      stock: 3,
      category_id: 6,
    },
  ]);
}
