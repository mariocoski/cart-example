import { Currency, Discount } from '../../interfaces';
import { Product as ProductModel } from '../../models/Product';
import { formatRawValueToMoney } from '../../calculator/formatRawValueToMoney';
import { RuleMatch } from '../../rulesEngine';

interface Options {
  products: ProductModel[];
  rulesMatches: RuleMatch[];
  currency: Currency;
}

export const getDiscounts = ({
  products,
  rulesMatches,
  currency,
}: Options): Discount[] => {
  return rulesMatches.map((ruleMatch: RuleMatch) => {
    const foundProduct = products.find(
      (product) => product.id === ruleMatch.productId
    );

    const rawDiscount =
      ruleMatch.discount * foundProduct.price * foundProduct.quantity;

    return {
      productId: ruleMatch.productId,
      value: formatRawValueToMoney(rawDiscount, currency),
    };
  });
};
