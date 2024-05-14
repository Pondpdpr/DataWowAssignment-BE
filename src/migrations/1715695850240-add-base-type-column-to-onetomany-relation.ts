import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseTypeColumnToOnetomanyRelation1715695850240 implements MigrationInterface {
    name = 'AddBaseTypeColumnToOnetomanyRelation1715695850240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation_log" DROP CONSTRAINT "FK_f68f9f87805ec47d0f718441120"`);
        await queryRunner.query(`ALTER TABLE "reservation_log" ALTER COLUMN "reservation_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_e219b0a4ff01b85072bfadf3fd7"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_aa85b64cd47be40f02ba1c7b49a"`);
        await queryRunner.query(`ALTER TABLE "reservation" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservation" ALTER COLUMN "concert_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservation_log" ADD CONSTRAINT "FK_f68f9f87805ec47d0f718441120" FOREIGN KEY ("reservation_id") REFERENCES "reservation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_e219b0a4ff01b85072bfadf3fd7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_aa85b64cd47be40f02ba1c7b49a" FOREIGN KEY ("concert_id") REFERENCES "concert"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_aa85b64cd47be40f02ba1c7b49a"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_e219b0a4ff01b85072bfadf3fd7"`);
        await queryRunner.query(`ALTER TABLE "reservation_log" DROP CONSTRAINT "FK_f68f9f87805ec47d0f718441120"`);
        await queryRunner.query(`ALTER TABLE "reservation" ALTER COLUMN "concert_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservation" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_aa85b64cd47be40f02ba1c7b49a" FOREIGN KEY ("concert_id") REFERENCES "concert"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_e219b0a4ff01b85072bfadf3fd7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation_log" ALTER COLUMN "reservation_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservation_log" ADD CONSTRAINT "FK_f68f9f87805ec47d0f718441120" FOREIGN KEY ("reservation_id") REFERENCES "reservation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
