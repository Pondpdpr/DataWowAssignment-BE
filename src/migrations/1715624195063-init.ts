import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1715624195063 implements MigrationInterface {
    name = 'Init1715624195063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "concert" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "limit" integer NOT NULL, "reserved" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_c96bfb33ee9a95525a3f5269d1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."reservation_log_action_enum" AS ENUM('Reserve', 'Cancel')`);
        await queryRunner.query(`CREATE TABLE "reservation_log" ("id" SERIAL NOT NULL, "action" "public"."reservation_log_action_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" uuid, "reservation_id" uuid, CONSTRAINT "PK_93536097480538af8d87e37124f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "concert_id" uuid, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reservation_log" ADD CONSTRAINT "FK_6ec5ead76e7be29d79e2649cd88" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation_log" ADD CONSTRAINT "FK_f68f9f87805ec47d0f718441120" FOREIGN KEY ("reservation_id") REFERENCES "reservation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_e219b0a4ff01b85072bfadf3fd7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_aa85b64cd47be40f02ba1c7b49a" FOREIGN KEY ("concert_id") REFERENCES "concert"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_aa85b64cd47be40f02ba1c7b49a"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_e219b0a4ff01b85072bfadf3fd7"`);
        await queryRunner.query(`ALTER TABLE "reservation_log" DROP CONSTRAINT "FK_f68f9f87805ec47d0f718441120"`);
        await queryRunner.query(`ALTER TABLE "reservation_log" DROP CONSTRAINT "FK_6ec5ead76e7be29d79e2649cd88"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`DROP TABLE "reservation_log"`);
        await queryRunner.query(`DROP TYPE "public"."reservation_log_action_enum"`);
        await queryRunner.query(`DROP TABLE "concert"`);
    }

}
