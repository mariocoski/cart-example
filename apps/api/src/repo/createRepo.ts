import { DbConnection } from './utils/createDbConnection';
import createOrGetCheckout, {
  CreateOrGetCheckout,
} from './functions/createOrGetCheckout';
import getProductsByCartId, {
  GetProductsByCartId,
} from './functions/getProductsByCartId';
import getProductDiscounts, {
  GetProductDiscounts,
} from './functions/getProductDiscounts';

export interface UrlItem {
  id: string;
  url: string;
  shortUrl: string;
}

export type CreateUrl = (url: string) => Promise<UrlItem>;
export type GetUrls = (orderBy: string) => Promise<UrlItem[]>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Repo {
  createOrGetCheckout: CreateOrGetCheckout;
  getProductsByCartId: GetProductsByCartId;
  getProductDiscounts: GetProductDiscounts;
}

export interface Postgres {
  connectionUri: string;
}

export interface Config {
  dbConnection: DbConnection;
}

const createRepo = async (config: Config): Promise<Repo> => {
  return {
    createOrGetCheckout: createOrGetCheckout(config),
    getProductsByCartId: getProductsByCartId(config),
    getProductDiscounts: getProductDiscounts(config),
  };
};

export default createRepo;
