import { MigrationInterface, QueryRunner } from 'typeorm';

export class createProductsTable1634071066694 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" (
                "id" INTEGER NOT NULL, 
                "name" VARCHAR(255) NOT NULL, 
                "price" DECIMAL(12,2) NOT NULL, 
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                "deleted_at" TIMESTAMP WITH TIME ZONE, 
                CONSTRAINT "PK_4125928952907" PRIMARY KEY ("id"))
              `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
