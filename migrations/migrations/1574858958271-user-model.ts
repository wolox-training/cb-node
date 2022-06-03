import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserModel1574858958271 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "User" ADD "last_name" varchar NULL');
    await queryRunner.query('ALTER TABLE "User" ADD "email" varchar NOT NULL');
    await queryRunner.query('ALTER TABLE "User" ADD "password" varchar NOT NULL');
  }

  public down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.clearSqlMemory();
    throw Error('not implemented yet');
  }
}
