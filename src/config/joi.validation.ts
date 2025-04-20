import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  STAGE: Joi.required().default('dev'),
  DB_HOST: Joi.required(),
  DB_PORT: Joi.number(),
  DB_NAME: Joi.required(),
  DB_USERNAME: Joi.required(),
  DB_PASSWORD: Joi.required(),
  SYNCHRONIZE: Joi.required(),
  PORT: Joi.number().default(3000),
  HOST_API: Joi.required(),
  JWT_SECRET: Joi.required().default('p3rs0n4al4cc0unt'),
});
