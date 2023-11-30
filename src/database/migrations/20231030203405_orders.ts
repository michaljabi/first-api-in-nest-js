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
    table.integer('orders_id').unsigned().notNullable();
    table
      .foreign('orders_id')
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE');

    table.integer('products_id').unsigned().notNullable();
    table
      .foreign('products_id')
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('order_products');
  await knex.schema.dropTable('orders');
}
