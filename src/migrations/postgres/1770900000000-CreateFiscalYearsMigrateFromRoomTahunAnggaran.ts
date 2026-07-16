import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFiscalYearsMigrateFromRoomTahunAnggaran1770900000000 implements MigrationInterface {
    name = 'CreateFiscalYearsMigrateFromRoomTahunAnggaran1770900000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "fiscal_years" (
                "id" SERIAL PRIMARY KEY,
                "kabkota_id" INTEGER NOT NULL,
                "tahun" INTEGER NOT NULL,
                "is_active" BOOLEAN NOT NULL DEFAULT true,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_fiscal_years_kabkota_tahun" UNIQUE ("kabkota_id", "tahun")
            );
        `);

        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint WHERE conname = 'fk_fiscal_years_kabkota'
                ) THEN
                    ALTER TABLE "fiscal_years"
                    ADD CONSTRAINT "fk_fiscal_years_kabkota"
                    FOREIGN KEY ("kabkota_id") REFERENCES "kabkotas"("id") ON DELETE CASCADE;
                END IF;
            END $$;
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_fiscal_years_kabkota"
            ON "fiscal_years" ("kabkota_id");
        `);

        await queryRunner.query(`
            INSERT INTO "fiscal_years" ("kabkota_id", "tahun", "is_active", "created_at")
            SELECT r."kabkota_id", rta."tahun", rta."is_active", rta."created_at"
            FROM "room_tahun_anggarans" rta
            INNER JOIN "rooms" r ON r."id" = rta."room_id"
            WHERE r."kabkota_id" IS NOT NULL
            ON CONFLICT ("kabkota_id", "tahun") DO NOTHING;
        `);

        await queryRunner.query(`
            ALTER TABLE "room_tahun_anggarans" DROP CONSTRAINT IF EXISTS "fk_rta_room_id";
        `);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_rta_room_tahun";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_rta_room_id";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "room_tahun_anggarans";`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "room_tahun_anggarans" (
                "id" SERIAL PRIMARY KEY,
                "room_id" INTEGER NOT NULL,
                "tahun" INTEGER NOT NULL,
                "is_active" BOOLEAN NOT NULL DEFAULT true,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
            );
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS "idx_rta_room_tahun"
            ON "room_tahun_anggarans" ("room_id", "tahun");
        `);
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_rta_room_id" ON "room_tahun_anggarans" ("room_id");
        `);
        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_rta_room_id') THEN
                    ALTER TABLE "room_tahun_anggarans"
                    ADD CONSTRAINT "fk_rta_room_id"
                    FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE;
                END IF;
            END $$;
        `);

        await queryRunner.query(`
            INSERT INTO "room_tahun_anggarans" ("room_id", "tahun", "is_active", "created_at")
            SELECT r."id", fy."tahun", fy."is_active", fy."created_at"
            FROM "fiscal_years" fy
            INNER JOIN "rooms" r ON r."kabkota_id" = fy."kabkota_id"
            ON CONFLICT ("room_id", "tahun") DO NOTHING;
        `);

        await queryRunner.query(`DROP INDEX IF EXISTS "idx_fiscal_years_kabkota";`);
        await queryRunner.query(`
            ALTER TABLE "fiscal_years" DROP CONSTRAINT IF EXISTS "fk_fiscal_years_kabkota";
        `);
        await queryRunner.query(`DROP TABLE IF EXISTS "fiscal_years";`);
    }
}
