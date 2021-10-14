import { Product as ProductModel } from '../models/Product';
import { Currency, Discount, Money, Tax } from '../interfaces';
import { Repo } from '../repo/createRepo';
import { Calculator } from '../calculator/createCalculator';
import getCheckoutInfo, { GetCheckoutInfo } from './functions/getCheckoutInfo';

export interface Options {
  repo: Repo;
  calculator: Calculator;
}

export interface CheckoutInfo {
  id: number;
  cartId: number;
  subtotal: Money;
  subtotalAfterTax: Money;
  products: ProductModel[];
  discounts: Discount[];
  tax: Money;
  currency: Currency;
  total: Money;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Service {
  getCheckoutInfo: GetCheckoutInfo;
}

export const createService = ({ repo, calculator }: Options): Service => {
  return {
    getCheckoutInfo: getCheckoutInfo({ repo, calculator }),
  };
};
