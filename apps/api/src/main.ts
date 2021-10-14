import * as express from 'express';
import * as cors from 'cors';
import { createCalculator } from './calculator/createCalculator';
import { config } from './config';
import {
  createDbConnection,
  DbConnection,
} from './repo/utils/createDbConnection';
import createPresenter from './presenter/createPresenter';
import { createService } from './service/createService';
import createRepo from './repo/createRepo';
import { API_BASE_URL } from './constants';

export const init = async (dbConnection: DbConnection) => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  const repo = await createRepo({ dbConnection });

  const calculator = await createCalculator();

  const service = createService({ repo, calculator });

  const presenter: express.Router = createPresenter({ service });

  app.use(API_BASE_URL, presenter);

  app.use('*', (req, res, _next) => {
    console.log('Not found route', req.path);
    return res.status(404).send({ message: 'Not found' });
  });

  app.use((error, _req, res, _next) => {
    console.log('error', error);
    return res.status(500).send({
      message: 'Internal server error',
    });
  });

  process.on('unhandledRejection', (reason) => {
    console.error('reason', reason);
  });

  return app;
};

const runApp = async () => {
  const dbConnection = await createDbConnection();
  const app = await init(dbConnection);

  const server = app.listen(config.api.port, () => {
    console.log(`Listening at http://localhost:${config.api.port}`);
  });
  server.on('error', console.error);
};

runApp();
