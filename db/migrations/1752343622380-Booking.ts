import { MigrationInterface, QueryRunner } from "typeorm";

export class Booking1752343622380 implements MigrationInterface {
    name = 'Booking1752343622380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."bookings_paymenttype_enum" AS ENUM('cash', 'online')`);
        await queryRunner.query(`CREATE TYPE "public"."bookings_status_enum" AS ENUM('active', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "bookings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(120) NOT NULL, "phone" character varying(20) NOT NULL, "bookingDate" TIMESTAMP NOT NULL, "paymentType" "public"."bookings_paymenttype_enum" NOT NULL, "isPaid" boolean NOT NULL DEFAULT false, "status" "public"."bookings_status_enum" NOT NULL DEFAULT 'active', "verificationCode" character varying(10) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "offer_id" uuid NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "branchAddress" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "author_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "rating" SET DEFAULT '0.0'`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_52c9a8d681cf69c654680dd482e" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_02fcfcc118488d4e87990f9b7dd" FOREIGN KEY ("offer_id") REFERENCES "offers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_64cd97487c5c42806458ab5520c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_64cd97487c5c42806458ab5520c"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_02fcfcc118488d4e87990f9b7dd"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_52c9a8d681cf69c654680dd482e"`);
        await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "rating" SET DEFAULT 0.0`);
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "author_id"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "branchAddress"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_paymenttype_enum"`);
    }

}
