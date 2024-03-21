import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1710988592897 implements MigrationInterface {
    name = 'Migration1710988592897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP CONSTRAINT "FK_06e076479515578ab1933ab4375"`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD "category" character varying`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD "status" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD "note" character varying`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD "toId" uuid`);
        await queryRunner.query(`ALTER TABLE "scrum"."users" ADD "transactionFromId" uuid`);
        await queryRunner.query(`ALTER TABLE "scrum"."users" ADD "transactionToId" uuid`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD CONSTRAINT "FK_06e076479515578ab1933ab4375" FOREIGN KEY ("userId") REFERENCES "scrum"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD CONSTRAINT "FK_52be9b3b8a7485351d722dad57f" FOREIGN KEY ("toId") REFERENCES "scrum"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scrum"."users" ADD CONSTRAINT "FK_af3f6f748f66083c17fc5df20c7" FOREIGN KEY ("transactionFromId") REFERENCES "scrum"."expense"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scrum"."users" ADD CONSTRAINT "FK_9dd1f5411dc5073de3a129e9753" FOREIGN KEY ("transactionToId") REFERENCES "scrum"."expense"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scrum"."users" DROP CONSTRAINT "FK_9dd1f5411dc5073de3a129e9753"`);
        await queryRunner.query(`ALTER TABLE "scrum"."users" DROP CONSTRAINT "FK_af3f6f748f66083c17fc5df20c7"`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP CONSTRAINT "FK_52be9b3b8a7485351d722dad57f"`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP CONSTRAINT "FK_06e076479515578ab1933ab4375"`);
        await queryRunner.query(`ALTER TABLE "scrum"."users" DROP COLUMN "transactionToId"`);
        await queryRunner.query(`ALTER TABLE "scrum"."users" DROP COLUMN "transactionFromId"`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP COLUMN "toId"`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD "note" character varying`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD "status" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD "category" character varying`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "scrum"."expense" ADD CONSTRAINT "FK_06e076479515578ab1933ab4375" FOREIGN KEY ("userId") REFERENCES "scrum"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
