// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  example: '.env.example',
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

export interface PostgresConfig {
  connectionUri: string;
}

export interface Config {
  api: {
    port: string;
  };
  postgres: PostgresConfig;
}

// config validated in runtime using dotenv-safe package
export const config: Config = {
  api: {
    port: process.env.API_PORT as string,
  },
  postgres: {
    connectionUri: process.env.POSTGRES_CONNECTION_URI as string,
  },
};
