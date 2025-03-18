import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCT_SERVICE_PORT: number;
  PRODUCT_SERVICE_HOST: string;
}

const envsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().port().required(),
    PRODUCT_SERVICE_HOST: joi.string().hostname().required(),
    PRODUCT_SERVICE_PORT: joi.number().port().required(),
  })
  .unknown(true);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  productServiceHost: envVars.PRODUCT_SERVICE_HOST,
  productServicePort: envVars.PRODUCT_SERVICE_PORT,
};
