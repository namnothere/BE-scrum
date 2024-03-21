import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1710990571544 implements MigrationInterface {
  name = 'Migration1710990571544';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "scrum"."users" ADD "balance" integer NOT NULL DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "scrum"."users" DROP COLUMN "balance"`);
  }
}
