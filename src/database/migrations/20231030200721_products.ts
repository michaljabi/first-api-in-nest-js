import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();

    table.string('name').notNullable();
    table.decimal('stock').defaultTo(0);
    table.decimal('price').defaultTo(0);
    table.string('img_url').notNullable();
    table.text('description');

    table.integer('category_id').unsigned();
    table
      .foreign('category_id')
      .references('id')
      .inTable('categories')
      .onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('products');
}
