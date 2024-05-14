import { MigrationInterface, QueryRunner } from "typeorm";

export class FixBaseTypeColumnToOnetomanyRelation1715695934581 implements MigrationInterface {
    name = 'FixBaseTypeColumnToOnetomanyRelation1715695934581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation_log" DROP CONSTRAINT "FK_6ec5ead76e7be29d79e2649cd88"`);
        await queryRunner.query(`ALTER TABLE "reservation_log" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "reservation_log" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservation_log" ADD CONSTRAINT "FK_7458bab2b0ebb12bc594ff1df24" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation_log" DROP CONSTRAINT "FK_7458bab2b0ebb12bc594ff1df24"`);
        await queryRunner.query(`ALTER TABLE "reservation_log" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservation_log" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "reservation_log" ADD CONSTRAINT "FK_6ec5ead76e7be29d79e2649cd88" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
