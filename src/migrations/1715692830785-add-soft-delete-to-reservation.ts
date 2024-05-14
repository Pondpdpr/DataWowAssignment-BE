import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSoftDeleteToReservation1715692830785 implements MigrationInterface {
    name = 'AddSoftDeleteToReservation1715692830785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "deletedAt"`);
    }

}
