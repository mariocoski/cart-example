import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Checkout } from './Checkout';
import { Product } from './Product';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Checkout)
  @JoinTable({
    name: 'checkouts',
  })
  checkout: Checkout;

  @ManyToMany(() => Product, (product: any) => product.carts, { eager: true })
  @JoinTable({
    name: 'carts_products',
    joinColumn: {
      name: 'cart_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: null | Date;
}
