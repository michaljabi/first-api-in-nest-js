import { Global, Logger, Module } from '@nestjs/common';
import knex from 'knex';
import knexConfig from '../../knexfile';
import { Model } from 'objection';

const logger = new Logger('DbConnection');
// potrzebujemy referencji, aby potem wrzucić ją do exports!
const knexProvider = {
  provide: 'DbConnection', // 'DbConnection' to nasz pomysł na nazwę tokena, może być dowolna!
  useFactory: async (): Promise<knex.Knex> => {
    const connection = knex(knexConfig['development']);
    logger.log('Knex connected');
    // Jeśli chcesz, podejrzyj sobie, co dokładnie importujemy:
    // logger.debug(knexConfig['development'])
    Model.knex(connection);
    return connection;
  },
};

@Module({
  providers: [knexProvider],
  exports: [knexProvider], // Udostępnij provider
})
@Global() // Chcemy, żeby każdy, kto poprosi o połączenie, dostał provider!
export class DatabaseModule {}
