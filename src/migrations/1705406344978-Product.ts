import { MigrationInterface, QueryRunner } from "typeorm";

export class Product1705406344978 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD COLUMN "hover_image" character varying NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    `ALTER TABLE "product" DROP COLUMN "hover_image"`;
  }
}
