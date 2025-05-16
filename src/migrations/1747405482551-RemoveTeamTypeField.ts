import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveTeamTypeField1747405482551 implements MigrationInterface {
  name = 'RemoveTeamTypeField1747405482551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`team\` DROP COLUMN \`type\`
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
