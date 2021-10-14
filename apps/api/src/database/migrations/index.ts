import { createProductsTable1634071066694 } from './1634071066694-create_products_table';
import { createCartsTable1634071094510 } from './1634071094510-create_carts_table';
import { createCheckoutsTable1634071094990 } from './1634071094990-create_checkouts_table';
import { createCartsProductsTable1634071118858 } from './1634071118858-create_carts_products_table';
import { createProductDiscountsTable1634071118999 } from './1634071118999-create_product_discounts';
import { initialDbSeed1634071953686 } from './1634071953686-initial_db_seed';

const migrations = [
  createProductsTable1634071066694,
  createCartsTable1634071094510,
  createCartsProductsTable1634071118858,
  createCheckoutsTable1634071094990,
  createProductDiscountsTable1634071118999,
  initialDbSeed1634071953686,
];

module.exports = migrations;
