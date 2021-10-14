import { Checkout } from '../database/entities/Checkout';
import { Product } from '../database/entities/Product';

export class Cart {
  id!: number;
  checkout: Checkout;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
}
