import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1710399160397 implements MigrationInterface {
  name = 'Migration1710399160397';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "scrum"."expense" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL DEFAULT '0', "description" character varying, "category" character varying, "status" integer NOT NULL DEFAULT '0', "note" character varying, "userId" uuid, CONSTRAINT "PK_edd925b450e13ea36197c9590fc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "scrum"."expense" ADD CONSTRAINT "FK_06e076479515578ab1933ab4375" FOREIGN KEY ("userId") REFERENCES "scrum"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP CONSTRAINT "FK_06e076479515578ab1933ab4375"`);
    await queryRunner.query(`DROP TABLE "scrum"."expense"`);
  }
}
