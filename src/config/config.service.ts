import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

const Envs = ['development', 'production', 'test', 'provision'] as const;
type NodeEnv = typeof Envs[number];
const Env = Envs.reduce((nodeEnv, env) => ({ ...nodeEnv, [env]: env }), {} as {
  [key in NodeEnv]: key
});

export interface ValidatedEnvConfig {
  NODE_ENV: NodeEnv;
  PORT: number;
  API_AUTH_ENABLED: boolean;
}

export class ConfigService {
  private envConfig: ValidatedEnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));

    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): never | ValidatedEnvConfig {
    const envVarsSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(Envs)
        .default(Env.development),
      PORT: Joi.number().default(3000),
      API_AUTH_ENABLED: Joi.boolean().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    } else {
      return (validatedEnvConfig as unknown) as ValidatedEnvConfig;
    }
  }

  get = <Key extends keyof ValidatedEnvConfig>(
    key: Key,
  ): ValidatedEnvConfig[Key] => {
    return this.envConfig[key];
  }
}
