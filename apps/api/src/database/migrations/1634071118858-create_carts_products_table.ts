import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCartsProductsTable1634071118858
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'carts_products',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'cart_id',
            type: 'int',
          },
          {
            name: 'product_id',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            name: 'Cart',
            referencedTableName: 'carts',
            referencedColumnNames: ['id'],
            columnNames: ['cart_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'Product',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('carts_products');
  }
}
