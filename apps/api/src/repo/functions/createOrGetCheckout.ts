import { Checkout } from '../../database/entities/Checkout';
import { Config } from '../../repo/createRepo';

export type CreateOrGetCheckout = (cartId: number) => Promise<Checkout>;

const createOrGetCheckout =
  ({ dbConnection }: Config): CreateOrGetCheckout =>
  async (cartId: number) => {
    const result = await dbConnection.db
      .getRepository(Checkout)
      .findOne({ cartId }, { relations: ['cart'] });

    if (!result) {
      throw new Error('Checkout does not exists');
    }
    return result;
  };

export default createOrGetCheckout;
