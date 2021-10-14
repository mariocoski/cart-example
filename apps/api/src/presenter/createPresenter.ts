import * as express from 'express';
import { Service } from '../service/createService';
import createCheckout from './functions/createCheckout';
interface Options {
  service: Service;
}

const createPresenter = ({ service }: Options): express.Router => {
  const router = express.Router();

  // POST   /carts <- create new cart
  // GET    /carts/:cartId <- get cart by id
  // DELETE    /carts/:cartId <- delete cart by id
  // DELETE    /carts/:cartId <- delete cart by id
  // POST   /carts/:cartId/products <- add product to the cart
  // DELETE   /carts/:cartId/products <- empty cart
  // PATCH    /carts/:cartId/products/:productId <- update quantity of a product in cart
  // DELETE /carts/:cartId/products/:productId

  router.put('/checkouts/:cartId', createCheckout({ service }));

  return router;
};

export default createPresenter;
