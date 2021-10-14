import { ProductDiscount } from '../../database/entities/ProductDiscount';

export const extractRulesFromProductDiscounts = (
  productDiscounts: ProductDiscount[]
): any[] => {
  return productDiscounts.map((productDiscount: ProductDiscount) => {
    return {
      conditions: productDiscount.rule,
      event: {
        type: productDiscount.title,
        params: {
          productDiscount: productDiscount.id,
          productId: productDiscount.productId,
          discount: productDiscount.discount,
          type: productDiscount.title,
        },
      },
    };
  });
};