import { In } from 'typeorm';
import { ProductDiscount } from '../../database/entities/ProductDiscount';
import { Config } from '../../repo/createRepo';

export type GetProductDiscounts = (
  productIds?: number[]
) => Promise<ProductDiscount[]>;

const getProductDiscounts =
  ({ dbConnection }: Config): GetProductDiscounts =>
  async (productIds: number[]) => {
    const filter = productIds ? { productId: In([null, ...productIds]) } : {};

    const result = await dbConnection.db
      .getRepository(ProductDiscount)
      .find(filter);

    return result;
  };

export default getProductDiscounts;
