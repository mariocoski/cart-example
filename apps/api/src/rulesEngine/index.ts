import { Engine } from 'json-rules-engine';
import { Product as ProductModel } from '../models/Product';

export interface RuleMatch {
  productDiscountId: number;
  productId: number;
  type: string;
  discount: number;
}

export const getRulesMatches = async (
  products: ProductModel[],
  rules: any[]
): Promise<RuleMatch[]> => {
  const finalResults: RuleMatch[] = [];
  const engine = new Engine();

  let i = 1;
  for (const product of products) {
    for (const rule of rules) {
      engine.addRule(rule);
      try {
        await engine.run(product);

        if (rule?.event?.params?.productId === product.id) {
          finalResults.push(rule.event.params);
        }
      } catch (error) {
        console.error('error', error);
      } finally {
        engine.removeRule(rule);
        i++;
      }
    }
  }
  return finalResults;
};

export default getRulesMatches;
