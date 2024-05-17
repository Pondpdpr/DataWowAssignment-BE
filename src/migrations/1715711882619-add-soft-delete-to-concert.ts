import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSoftDeleteToConcert1715711882619 implements MigrationInterface {
  name = 'AddSoftDeleteToConcert1715711882619';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "concert" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "concert" DROP COLUMN "deletedAt"`);
  }
}
