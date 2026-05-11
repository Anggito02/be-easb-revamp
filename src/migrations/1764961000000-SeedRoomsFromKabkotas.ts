import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoomsFromKabkotas1764961000000 implements MigrationInterface {
    name = 'SeedRoomsFromKabkotas1764961000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "rooms" ("kode_room", "nama", "kabkota_id", "is_active", "created_at", "updated_at")
            SELECT
                k."kode",
                k."nama",
                k."id",
                false,
                now(),
                now()
            FROM "kabkotas" k
            WHERE k."deleted_at" IS NULL
              AND NOT EXISTS (
                SELECT 1 FROM "rooms" r WHERE r."kabkota_id" = k."id" AND r."deleted_at" IS NULL
              )
            ON CONFLICT DO NOTHING;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Only remove seeded rooms — those with NULL created_by_user_id linked to a kabkota
        await queryRunner.query(`
            DELETE FROM "rooms" WHERE "created_by_user_id" IS NULL AND "kabkota_id" IS NOT NULL;
        `);
    }
}
