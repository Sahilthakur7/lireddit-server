import {MigrationInterface, QueryRunner} from "typeorm";

export class AddHeaderToPosts1640587578163 implements MigrationInterface {
    name = 'AddHeaderToPosts1640587578163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "header" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "header"`);
    }

}
