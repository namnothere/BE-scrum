import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1710994430953 implements MigrationInterface {
  name = 'Migration1710994430953';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD "transaction_id" uuid`);
    await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD CONSTRAINT "UQ_69f83886394c3078d274375eba8" UNIQUE ("transaction_id")`);
    await queryRunner.query(
      `ALTER TABLE "scrum"."expense" ADD CONSTRAINT "FK_69f83886394c3078d274375eba8" FOREIGN KEY ("transaction_id") REFERENCES "scrum"."transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP CONSTRAINT "FK_69f83886394c3078d274375eba8"`);
    await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP CONSTRAINT "UQ_69f83886394c3078d274375eba8"`);
    await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP COLUMN "transaction_id"`);
  }
}
