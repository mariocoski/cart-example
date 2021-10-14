import * as express from 'express';
import * as request from 'supertest';
import {
  createDbConnection,
  DbConnection,
} from '../../repo/utils/createDbConnection';
import { useTestDb, shutDownTestDb } from '../../repo/utils/testDbHelpers';
import { init } from '../../main';
import { API_BASE_URL } from '../../constants';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  example: '.env.example',
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
const OK = 200;

describe('getCheckout', () => {
  let app: express.Application;
  let dbConnection: DbConnection;
  const OLD_ENV = process.env;

  beforeAll(async () => {
    jest.clearAllMocks();
    process.env = {
      ...OLD_ENV,
    };
    useTestDb();
  });

  beforeEach(async () => {
    dbConnection = await createDbConnection();
    app = await init(dbConnection);
  });

  afterAll(() => {
    process.env = OLD_ENV;
    shutDownTestDb();
  });

  it('returns a checkout info for a given cartId', async () => {
    const cartId = 1;
    const response = await request(app)
      .put(`${API_BASE_URL}/checkouts/${cartId}`)
      .send();

    const expectedResponseBody = {
      id: 1,
      cartId: 1,
      tax: {
        raw: 9.37,
        formatted: '9.37',
        formattedWithSymbol: '$9.37',
        formattedWithCode: '9.37 USD',
      },
      currency: {
        code: 'USD',
        symbol: '$',
      },
      products: [
        {
          id: 1,
          name: 'Apple',
          price: '10.99',
          quantity: 2,
        },
        {
          id: 3,
          name: 'Strawberry',
          price: '19.99',
          quantity: 1,
        },
        {
          id: 4,
          name: 'Pineapple',
          price: '24.99',
          quantity: 1,
        },
      ],
      subtotal: {
        raw: 66.96,
        formatted: '66.96',
        formattedWithSymbol: '$66.96',
        formattedWithCode: '66.96 USD',
      },
      subtotalAfterTax: {
        raw: 76.33,
        formatted: '76.33',
        formattedWithSymbol: '$76.33',
        formattedWithCode: '76.33 USD',
      },
      discounts: [
        {
          productId: 3,
          value: {
            raw: 9.99,
            formatted: '9.99',
            formattedWithSymbol: '$9.99',
            formattedWithCode: '9.99 USD',
          },
        },
        {
          productId: 4,
          value: {
            raw: 2.5,
            formatted: '2.50',
            formattedWithSymbol: '$2.50',
            formattedWithCode: '2.50 USD',
          },
        },
      ],
      total: {
        raw: 63.84,
        formatted: '63.84',
        formattedWithSymbol: '$63.84',
        formattedWithCode: '63.84 USD',
      },
    };
    expect(response.status).toBe(OK);
    expect(response.body).toEqual(expectedResponseBody);
  });
});
