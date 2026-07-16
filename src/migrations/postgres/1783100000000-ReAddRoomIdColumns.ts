import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Re-adds the `room_id` column (nullable INTEGER, FK -> rooms(id) ON DELETE SET NULL, + index)
 * to the tables whose ORM entities still declare it.
 *
 * Background: an earlier migration `1765000000009-DropOrphanRoomIdColumns` dropped `room_id`
 * from all tables, but its source file was later deleted and the application code (ORM entities,
 * repositories, JWT payload, user.service.updateRoomId) was never updated to match. This caused
 * every query against those tables to fail (e.g. POST /auth/login returned HTTP 500
 * "Failed to validate user"). This migration restores schema/code consistency by re-adding the
 * columns idempotently.
 *
 * Affected tables: users, opds, rekenings, asb_klasifikasi, asb_komponen_bangunan_nonstd,
 * asb_komponen_bangunan_stds, asb_lantais, standard_klasifikasi, verifikators.
 */
export class ReAddRoomIdColumns1783100000000 implements MigrationInterface {
    name = 'ReAddRoomIdColumns1783100000000';

    private readonly tables = [
        'users',
        'opds',
        'rekenings',
        'asb_klasifikasi',
        'asb_komponen_bangunan_nonstd',
        'asb_komponen_bangunan_stds',
        'asb_lantais',
        'standard_klasifikasi',
        'verifikators',
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const table of this.tables) {
            const fkName = `fk_${table}_room_id`;
            const idxName = `idx_${table}_room_id`;

            await queryRunner.query(
                `ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`,
            );

            await queryRunner.query(
                `CREATE INDEX IF NOT EXISTS "${idxName}" ON "${table}" ("room_id");`,
            );

            await queryRunner.query(`
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '${fkName}') THEN
                        ALTER TABLE "${table}"
                        ADD CONSTRAINT "${fkName}"
                        FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;
                    END IF;
                END $$;
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (const table of this.tables) {
            const fkName = `fk_${table}_room_id`;
            const idxName = `idx_${table}_room_id`;

            await queryRunner.query(`ALTER TABLE "${table}" DROP CONSTRAINT IF EXISTS "${fkName}";`);
            await queryRunner.query(`DROP INDEX IF EXISTS "${idxName}";`);
            await queryRunner.query(`ALTER TABLE "${table}" DROP COLUMN IF EXISTS "room_id";`);
        }
    }
}
