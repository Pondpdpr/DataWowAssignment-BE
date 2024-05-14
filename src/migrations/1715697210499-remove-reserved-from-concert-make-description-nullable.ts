import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveReservedFromConcertMakeDescriptionNullable1715697210499 implements MigrationInterface {
    name = 'RemoveReservedFromConcertMakeDescriptionNullable1715697210499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "concert" DROP COLUMN "reserved"`);
        await queryRunner.query(`ALTER TABLE "concert" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "concert" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "concert" ADD "reserved" integer NOT NULL DEFAULT '0'`);
    }

}
