import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1710989750884 implements MigrationInterface {
  name = 'Migration1710989750884';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "scrum"."transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "toId" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "scrum"."users" ADD "transactionFromId" uuid`);
    await queryRunner.query(`ALTER TABLE "scrum"."users" ADD "transactionToId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "scrum"."transaction" ADD CONSTRAINT "FK_a02bf62a801914225fc2cad7ff7" FOREIGN KEY ("toId") REFERENCES "scrum"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "scrum"."users" ADD CONSTRAINT "FK_af3f6f748f66083c17fc5df20c7" FOREIGN KEY ("transactionFromId") REFERENCES "scrum"."transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "scrum"."users" ADD CONSTRAINT "FK_9dd1f5411dc5073de3a129e9753" FOREIGN KEY ("transactionToId") REFERENCES "scrum"."transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "scrum"."users" DROP CONSTRAINT "FK_9dd1f5411dc5073de3a129e9753"`);
    await queryRunner.query(`ALTER TABLE "scrum"."users" DROP CONSTRAINT "FK_af3f6f748f66083c17fc5df20c7"`);
    await queryRunner.query(`ALTER TABLE "scrum"."transaction" DROP CONSTRAINT "FK_a02bf62a801914225fc2cad7ff7"`);
    await queryRunner.query(`ALTER TABLE "scrum"."users" DROP COLUMN "transactionToId"`);
    await queryRunner.query(`ALTER TABLE "scrum"."users" DROP COLUMN "transactionFromId"`);
    await queryRunner.query(`DROP TABLE "scrum"."transaction"`);
  }
}
