import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1710945972319 implements MigrationInterface {
  name = 'Migration1710945972319';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP COLUMN "created_at"`);
  }
}
