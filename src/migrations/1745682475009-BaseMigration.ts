import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigration1745682475009 implements MigrationInterface {
    name = 'BaseMigration1745682475009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` varchar(36) NOT NULL,
                \`sso_id\` varchar(255) NOT NULL,
                UNIQUE INDEX \`IDX_d8b633bf977f97de8de43d95d1\` (\`sso_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX \`IDX_d8b633bf977f97de8de43d95d1\` ON \`user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user\`
        `);
    }

}
