import { Repo } from '../../repo/createRepo';
import { Calculator } from '../../calculator/createCalculator';
import { CheckoutInfo } from '../createService';
import { Currency, Tax } from '../../interfaces';
import { Checkout } from '../../database/entities/Checkout';
import { getRulesMatches } from '../../rulesEngine';
import { Product as ProductModel } from '../../models/Product';
import { getDiscounts } from '../utils/getDiscounts';
import { extractRulesFromProductDiscounts } from '../utils/extractRulesFromProductDiscounts';

interface Options {
  repo: Repo;
  calculator: Calculator;
}

export type GetCheckoutInfo = (cartId: number) => Promise<CheckoutInfo>;

const getCheckoutInfo =
  ({ repo, calculator }: Options): GetCheckoutInfo =>
  async (cartId: number) => {
    const checkout: Checkout = await repo.createOrGetCheckout(cartId);

    // this can be derived dynamically in the future
    const taxRate: Tax = {
      raw: 0.14,
      value: '14%',
    };
    const currency: Currency = {
      code: 'USD',
      symbol: '$',
    };

    const products: ProductModel[] = await repo.getProductsByCartId(cartId);

    const productIds = products.map((product: ProductModel) => product.id);

    const productDiscounts = await repo.getProductDiscounts(productIds);

    const rules = extractRulesFromProductDiscounts(productDiscounts);

    const rulesMatches = await getRulesMatches(products, rules);

    const discounts = getDiscounts({ products, rulesMatches, currency });

    const { subtotal, subtotalAfterTax, tax } =
      calculator.calculateSubtotalAndTax({
        products,
        productDiscounts,
        tax: taxRate,
        currency,
      });

    const total = calculator.calculateTotal({
      subtotalAfterTax,
      discounts,
      currency,
    });

    return {
      id: checkout.id,
      cartId: cartId,
      tax,
      currency,
      products,
      subtotal,
      subtotalAfterTax,
      discounts,
      total,
    };
  };

export default getCheckoutInfo;
