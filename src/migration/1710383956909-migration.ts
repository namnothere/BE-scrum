import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1710383956909 implements MigrationInterface {
  name = 'Migration1710383956909';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "scrum"."users" ADD "role" character varying NOT NULL DEFAULT 'USER'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "scrum"."users" DROP COLUMN "role"`);
  }
}
