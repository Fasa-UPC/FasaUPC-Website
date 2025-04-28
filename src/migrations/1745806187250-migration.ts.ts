import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1745806187250 implements MigrationInterface {
    name = 'Migration1745806187250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`sso_id\` varchar(255) NOT NULL, \`role\` enum ('admin', 'developer', 'user') NOT NULL, UNIQUE INDEX \`IDX_d8b633bf977f97de8de43d95d1\` (\`sso_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(20) NOT NULL, \`status\` enum ('pending', 'in_progress', 'completed', 'on_hold', 'canceled', 'delayed', 'under_review', 'in_testing', 'in_development', 'ready_for_deployment', 'archived') NOT NULL, \`description\` text NOT NULL, \`image\` text NOT NULL, \`type\` varchar(255) NOT NULL, \`banner\` text NOT NULL, \`begin_date\` date NOT NULL, \`end_date\` date NOT NULL, \`online_link\` text NOT NULL, \`github_link\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` varchar(36) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`first_name\` varchar(15) NOT NULL, \`last_name\` varchar(20) NOT NULL, \`title\` varchar(20) NOT NULL, \`province\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`summary\` text NOT NULL, \`image\` text NOT NULL, \`banner\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`social\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(20) NOT NULL, \`image\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profile_social\` (\`id\` varchar(36) NOT NULL, \`profile_id\` varchar(255) NOT NULL, \`social_id\` varchar(255) NOT NULL, \`link\` text NOT NULL, UNIQUE INDEX \`IDX_57f23aef8bba4c9e21bdd7aa7d\` (\`profile_id\`, \`social_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`team\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(20) NOT NULL, \`description\` text NOT NULL, \`type\` enum ('computer engineering', 'computer science', 'electrical engineering', 'mechanical engineering', 'civil engineering', 'mathematics', 'statistics', 'food industry', 'physics', 'water engineering') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_team\` (\`id\` varchar(36) NOT NULL, \`project_id\` varchar(255) NOT NULL, \`team_id\` varchar(255) NOT NULL, \`collaboration\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skill\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(20) NOT NULL, \`image\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tech\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(20) NOT NULL, \`image\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tech_project\` (\`id\` varchar(36) NOT NULL, \`tech_id\` varchar(255) NOT NULL, \`project_id\` varchar(255) NOT NULL, \`share\` float NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_skill\` (\`id\` varchar(36) NOT NULL, \`point\` text NOT NULL, \`profile_id\` varchar(255) NOT NULL, \`skill_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`userTeam\` (\`id\` varchar(36) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`team_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_d752442f45f258a8bdefeebb2f2\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profile_social\` ADD CONSTRAINT \`FK_7340b15cf3cae5b8cddc82723ec\` FOREIGN KEY (\`profile_id\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profile_social\` ADD CONSTRAINT \`FK_f06fd7c346bfaade5fc69264385\` FOREIGN KEY (\`social_id\`) REFERENCES \`social\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_team\` ADD CONSTRAINT \`FK_a9345c3453243453e8d722d6d4c\` FOREIGN KEY (\`team_id\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_team\` ADD CONSTRAINT \`FK_1e3ff843e4be046e69011c38b24\` FOREIGN KEY (\`project_id\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tech_project\` ADD CONSTRAINT \`FK_06cb847c9cf1313b45b0d8d6792\` FOREIGN KEY (\`tech_id\`) REFERENCES \`tech\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tech_project\` ADD CONSTRAINT \`FK_2027d5138ff7288dd972fd98448\` FOREIGN KEY (\`project_id\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_skill\` ADD CONSTRAINT \`FK_a8216de80d92024b3adefee812e\` FOREIGN KEY (\`profile_id\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_skill\` ADD CONSTRAINT \`FK_215460dc28b2f3cb6507c315eb3\` FOREIGN KEY (\`skill_id\`) REFERENCES \`skill\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`userTeam\` ADD CONSTRAINT \`FK_ca29d9d4ddbe931fc6cd3de0d50\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`userTeam\` ADD CONSTRAINT \`FK_6bb2f7c1ee9d9fae2aedd636b5e\` FOREIGN KEY (\`team_id\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`userTeam\` DROP FOREIGN KEY \`FK_6bb2f7c1ee9d9fae2aedd636b5e\``);
        await queryRunner.query(`ALTER TABLE \`userTeam\` DROP FOREIGN KEY \`FK_ca29d9d4ddbe931fc6cd3de0d50\``);
        await queryRunner.query(`ALTER TABLE \`user_skill\` DROP FOREIGN KEY \`FK_215460dc28b2f3cb6507c315eb3\``);
        await queryRunner.query(`ALTER TABLE \`user_skill\` DROP FOREIGN KEY \`FK_a8216de80d92024b3adefee812e\``);
        await queryRunner.query(`ALTER TABLE \`tech_project\` DROP FOREIGN KEY \`FK_2027d5138ff7288dd972fd98448\``);
        await queryRunner.query(`ALTER TABLE \`tech_project\` DROP FOREIGN KEY \`FK_06cb847c9cf1313b45b0d8d6792\``);
        await queryRunner.query(`ALTER TABLE \`project_team\` DROP FOREIGN KEY \`FK_1e3ff843e4be046e69011c38b24\``);
        await queryRunner.query(`ALTER TABLE \`project_team\` DROP FOREIGN KEY \`FK_a9345c3453243453e8d722d6d4c\``);
        await queryRunner.query(`ALTER TABLE \`profile_social\` DROP FOREIGN KEY \`FK_f06fd7c346bfaade5fc69264385\``);
        await queryRunner.query(`ALTER TABLE \`profile_social\` DROP FOREIGN KEY \`FK_7340b15cf3cae5b8cddc82723ec\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_d752442f45f258a8bdefeebb2f2\``);
        await queryRunner.query(`DROP TABLE \`userTeam\``);
        await queryRunner.query(`DROP TABLE \`user_skill\``);
        await queryRunner.query(`DROP TABLE \`tech_project\``);
        await queryRunner.query(`DROP TABLE \`tech\``);
        await queryRunner.query(`DROP TABLE \`skill\``);
        await queryRunner.query(`DROP TABLE \`project_team\``);
        await queryRunner.query(`DROP TABLE \`team\``);
        await queryRunner.query(`DROP INDEX \`IDX_57f23aef8bba4c9e21bdd7aa7d\` ON \`profile_social\``);
        await queryRunner.query(`DROP TABLE \`profile_social\``);
        await queryRunner.query(`DROP TABLE \`social\``);
        await queryRunner.query(`DROP TABLE \`profile\``);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP INDEX \`IDX_d8b633bf977f97de8de43d95d1\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
