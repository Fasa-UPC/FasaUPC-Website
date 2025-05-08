import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfileNullableFields1746174124720 implements MigrationInterface {
    name = 'ProfileNullableFields1746174124720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`userTeam\` (
                \`id\` varchar(36) NOT NULL,
                \`user_id\` varchar(255) NOT NULL,
                \`team_id\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`userTeam\`
            ADD CONSTRAINT \`FK_user_team\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`userTeam\`
            ADD CONSTRAINT \`FK_team_user\` FOREIGN KEY (\`team_id\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`userTeam\` DROP FOREIGN KEY \`FK_team_user\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`userTeam\` DROP FOREIGN KEY \`FK_user_team\`
        `);
        await queryRunner.query(`
            DROP TABLE \`userTeam\`
        `);
    }

}
