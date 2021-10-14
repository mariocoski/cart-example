import * as entities from '../entities';
import * as migrations from '../migrations';

const connectionConfig = {
  type: 'postgres',
  url: process.env.POSTGRES_CONNECTION_URI,
  entities: entities,
  migrations: migrations,
  synchronize: false,
  cli: {
    migrationsDir: 'apps/api/src/database/migrations',
  },
  logging: false,
};
export default connectionConfig;
