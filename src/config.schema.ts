import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(4000),
  LOG_LEVEL: Joi.string()
    .valid('debug', 'info', 'warn', 'error', 'fatal')
    .default('info'),
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
});
