import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialDbSeed1634071953686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            INSERT INTO products(id, name, price)
                VALUES
                (1,'Apple', 10.99),
                (2,'Orange','14.99'),
                (3,'Strawberry',19.99),
                (4,'Pineapple',24.99)
    `
    );

    await queryRunner.query(`
        INSERT INTO carts(id)
        VALUES (1)
    `);

    await queryRunner.query(`
        INSERT INTO carts_products 
             (id, quantity, cart_id, product_id) 
        VALUES 
            (1, 2, 1, 1),
            (2, 1, 1, 3),
            (3, 1, 1, 4)
    `);

    await queryRunner.query(`
        INSERT INTO product_discounts 
             (id, title, description, product_id, rule, discount) 
        VALUES 
            (1, '10% off Pineapple', 'Pineapple is on 10% off', 4, '{"any":[{"all":[{"fact":"id","operator":"equal","value":4}]}]}', 0.1),
            (2, '50% off Strawberry', 'Buy two Apple and get a Strawberry half its price', 3, '{"any":[{"all":[{"fact":"quantity","operator":"greaterThanInclusive","value":2},{"fact":"id","operator":"equal","value":1}]},{"all":[{"fact":"id","operator":"equal","value":3}]}]}', 0.5)
    `);

    await queryRunner.query(`
    INSERT INTO checkouts 
         (id, cart_id) 
    VALUES 
        (1, 1)
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "carts"`);
    await queryRunner.query(`DROP TABLE "carts_products"`);
    await queryRunner.query(`DROP TABLE "checkouts"`);
    await queryRunner.query(`DROP TABLE "product_discounts"`);
  }
}
