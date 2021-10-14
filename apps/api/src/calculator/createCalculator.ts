import { Product as ProductModel } from '../models/Product';
import { ProductDiscount } from '../database/entities/ProductDiscount';
import { Currency, Discount, Money, Tax } from '../interfaces';
import { formatRawValueToMoney } from './formatRawValueToMoney';

interface SubtotalCalculation {
  subtotal: Money;
  subtotalAfterTax: Money;
  tax: Money;
}

interface SubtotalOptions {
  products: ProductModel[];
  productDiscounts: ProductDiscount[];
  tax: Tax;
  currency: Currency;
}

interface TotalOptions {
  subtotalAfterTax: Money;
  discounts: Discount[];
  currency: Currency;
}

export interface Calculator {
  calculateSubtotalAndTax(options: SubtotalOptions): SubtotalCalculation;
  calculateTotal(options: TotalOptions): Money;
}

export const createCalculator = (): Calculator => {
  return {
    calculateSubtotalAndTax: ({
      products,
      tax,
      currency,
    }: SubtotalOptions): SubtotalCalculation => {
      const subtotalRaw = products.reduce((acc, nextProduct: any) => {
        return acc + nextProduct.quantity * nextProduct.price;
      }, 0);

      const subtotal = formatRawValueToMoney(subtotalRaw, currency);

      const taxNeeded = subtotalRaw * tax.raw;
      const subtotalRawAfterTax = subtotalRaw + taxNeeded;

      const taxNeededAsMoney = formatRawValueToMoney(taxNeeded, currency);
      const subtotalAfterTax = formatRawValueToMoney(
        subtotalRawAfterTax,
        currency
      );

      return {
        subtotal,
        subtotalAfterTax,
        tax: taxNeededAsMoney,
      };
    },
    calculateTotal: ({
      subtotalAfterTax,
      discounts,
      currency,
    }: TotalOptions): Money => {
      const totalRaw = discounts.reduce((finalTotal: number, discount) => {
        return finalTotal - discount.value.raw;
      }, subtotalAfterTax.raw);
      return formatRawValueToMoney(totalRaw, currency);
    },
  };
};
