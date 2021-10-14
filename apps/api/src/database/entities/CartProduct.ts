import { Column, Entity, JoinTable, OneToOne, PrimaryColumn } from 'typeorm';
import { Cart } from './Cart';
import { Product } from './Product';

@Entity('carts_products')
export class CartProduct {
  @Column({ type: 'int', nullable: false })
  quantity: number;

  @PrimaryColumn({ type: 'int' })
  product_id: number;

  @PrimaryColumn({ type: 'int' })
  cart_id: number;

  @OneToOne(() => Product)
  @JoinTable()
  product: Product;

  @OneToOne(() => Cart)
  @JoinTable()
  cart: Cart;
}

export default CartProduct;
