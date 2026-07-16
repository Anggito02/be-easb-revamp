import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActiveToUsers1770600000000 implements MigrationInterface {
    name = 'AddIsActiveToUsers1770600000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD COLUMN \`is_active\` TINYINT(1) NOT NULL DEFAULT 1;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`is_active\`;
        `);
    }
}
