import { Cart } from '../database/entities/Cart';

export class Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  carts: Cart[];
}
