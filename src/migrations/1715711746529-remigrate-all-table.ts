import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemigrateAllTable1715711746529 implements MigrationInterface {
  name = 'RemigrateAllTable1715711746529';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "concert" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "limit" integer NOT NULL, CONSTRAINT "PK_c96bfb33ee9a95525a3f5269d1f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reservation_log" ("id" SERIAL NOT NULL, "user_id" uuid NOT NULL, "reservation_id" uuid NOT NULL, "action" "public"."reservation_log_action_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_93536097480538af8d87e37124f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "concert_id" uuid NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_log" ADD CONSTRAINT "FK_7458bab2b0ebb12bc594ff1df24" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_log" ADD CONSTRAINT "FK_f68f9f87805ec47d0f718441120" FOREIGN KEY ("reservation_id") REFERENCES "reservation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_e219b0a4ff01b85072bfadf3fd7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_aa85b64cd47be40f02ba1c7b49a" FOREIGN KEY ("concert_id") REFERENCES "concert"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_aa85b64cd47be40f02ba1c7b49a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_e219b0a4ff01b85072bfadf3fd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_log" DROP CONSTRAINT "FK_f68f9f87805ec47d0f718441120"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_log" DROP CONSTRAINT "FK_7458bab2b0ebb12bc594ff1df24"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "reservation"`);
    await queryRunner.query(`DROP TABLE "reservation_log"`);
    await queryRunner.query(`DROP TABLE "concert"`);
  }
}
