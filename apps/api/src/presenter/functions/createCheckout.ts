import * as express from 'express';
import { Service } from '../../service/createService';

interface Options {
  service: Service;
}

const UNPROCESSABLE_ENTITY = 422;
const OK = 200;

const getCheckout =
  ({ service }: Options) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { cartId } = req.params;
      const normalizedCartId = Number(cartId);

      const isPayloadValid = !isNaN(normalizedCartId);

      if (!isPayloadValid) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .send({ message: 'Invalid cart id' });
      }

      const checkoutInfo = await service.getCheckoutInfo(normalizedCartId);

      res.status(OK).send(checkoutInfo);
    } catch (error) {
      next(error);
    }
  };

export default getCheckout;
