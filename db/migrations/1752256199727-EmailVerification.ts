import { MigrationInterface, QueryRunner } from "typeorm";

export class EmailVerification1752256199727 implements MigrationInterface {
    name = 'EmailVerification1752256199727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "rating" SET DEFAULT '0.0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "rating" SET DEFAULT 0.0`);
    }

}
