import { Connection, createConnection } from 'typeorm';
import connectionConfig from '../../database/config/typeorm_config';

export interface DbConnection {
  db: Connection;
}
let db;

export const createDbConnection = async (): Promise<DbConnection> => {
  if (!db) {
    db = await createConnection(connectionConfig as any);
  }

  return {
    db,
  };
};
