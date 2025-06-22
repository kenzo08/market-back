import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmailVerification1750626900678 implements MigrationInterface {
    name = 'CreateEmailVerification1750626900678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email_verification" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_b985a8362d9dac51e3d6120d40e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "rating" SET DEFAULT '0.0'`);
        await queryRunner.query(`ALTER TABLE "email_verification" ADD CONSTRAINT "FK_95b3bd492c85e471cd5e72277be" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_verification" DROP CONSTRAINT "FK_95b3bd492c85e471cd5e72277be"`);
        await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "rating" SET DEFAULT 0.0`);
        await queryRunner.query(`DROP TABLE "email_verification"`);
    }

}
