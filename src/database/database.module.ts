import { Logger, Module } from '@nestjs/common';
import knex from 'knex';
import knexConfig from '../../knexfile';
import { Model } from 'objection';

const logger = new Logger('DbConnection');

@Module({
  providers: [
    {
      provide: 'DbConnection',
      useFactory: async (): Promise<knex.Knex> => {
        const connection = knex(knexConfig['development']);
        logger.log('Knex connected');
        Model.knex(connection);
        return connection;
      },
    },
  ],
})
export class DatabaseModule {}
