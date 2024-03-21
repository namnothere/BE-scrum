import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1710999519005 implements MigrationInterface {
    name = 'Migration1710999519005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scrum"."users" ADD "avatar_url" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scrum"."users" DROP COLUMN "avatar_url"`);
    }

}
