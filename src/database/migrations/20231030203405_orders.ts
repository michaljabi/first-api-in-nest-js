import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();

    table.string('title').notNullable();
    table.datetime('made_at').defaultTo(knex.fn.now());
    table
      .enum('status', ['OPENED', 'IN_PROGRESS', 'SHIPPED', 'CLOSED'])
      .notNullable()
      .defaultTo('OPENED');
    table.decimal('total_price').notNullable();
  });
  await knex.schema.createTable('order_products', (table) => {
    table.increments('id').primary();

    table.decimal('quantity');
    table.integer('order_id').unsigned().notNullable();
    table
      .foreign('order_id')
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE');

    table.integer('product_id').unsigned().notNullable();
    table
      .foreign('product_id')
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('order_products');
  await knex.schema.dropTable('orders');
}
