import { In } from 'typeorm';
import { Cart } from '../../database/entities/Cart';
import CartProduct from '../../database/entities/CartProduct';
import { Product as ProductModel } from '../../models/Product';
import { Config } from '../createRepo';

export type GetProductsByCartId = (cartId: number) => Promise<ProductModel[]>;

const getProductsByCartId =
  ({ dbConnection }: Config): GetProductsByCartId =>
  async (cartId: number) => {
    const result = await dbConnection.db
      .getRepository(Cart)
      .findOne({ id: cartId });
    const productsIds = result.products.map((product) => product.id);

    // TODO: check joins instead
    const cartsProducts = await dbConnection.db
      .getRepository(CartProduct)
      .find({
        where: {
          cart_id: cartId,
          product_id: In([null, ...productsIds]),
        },
      });

    return result.products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      carts: product.carts,
      quantity: cartsProducts.find(
        (cartProduct) => cartProduct.product_id === product.id
      ).quantity,
    }));
  };

export default getProductsByCartId;
