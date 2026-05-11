import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRooms1764960000000 implements MigrationInterface {
    name = 'CreateRooms1764960000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create rooms table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "rooms" (
                "id" SERIAL PRIMARY KEY,
                "kode_room" VARCHAR(100) NOT NULL,
                "nama" VARCHAR(500) NOT NULL,
                "kabkota_id" INTEGER NULL,
                "contract_start" DATE NULL,
                "contract_end" DATE NULL,
                "is_active" BOOLEAN NOT NULL DEFAULT false,
                "created_by_user_id" INTEGER NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        // Unique constraint on kode_room
        await queryRunner.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS "idx_rooms_kode_room" ON "rooms" ("kode_room") WHERE "deleted_at" IS NULL;
        `);

        // Partial unique index for kabkota_id (allows multiple NULLs, enforces 1-1 for non-NULL)
        await queryRunner.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS "idx_rooms_kabkota_id_unique" ON "rooms" ("kabkota_id") WHERE "kabkota_id" IS NOT NULL AND "deleted_at" IS NULL;
        `);

        // Other indexes
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_rooms_is_active" ON "rooms" ("is_active");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_rooms_kabkota_id" ON "rooms" ("kabkota_id");
        `);

        // Trigger for updated_at
        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_rooms_updated_at') THEN
                    CREATE TRIGGER set_rooms_updated_at
                    BEFORE UPDATE ON "rooms"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);

        // Create room_tahun_anggarans table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "room_tahun_anggarans" (
                "id" SERIAL PRIMARY KEY,
                "room_id" INTEGER NOT NULL,
                "tahun" INTEGER NOT NULL,
                "is_active" BOOLEAN NOT NULL DEFAULT true,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
            );
        `);

        // Create unique index on room_id and tahun
        await queryRunner.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS "idx_rta_room_tahun" ON "room_tahun_anggarans" ("room_id", "tahun");
        `);

        // Create index on room_id
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_rta_room_id" ON "room_tahun_anggarans" ("room_id");
        `);

        // Foreign key: room_tahun_anggarans → rooms
        await queryRunner.query(`
            ALTER TABLE "room_tahun_anggarans"
            ADD CONSTRAINT "fk_rta_room_id"
            FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key
        await queryRunner.query(`
            ALTER TABLE "room_tahun_anggarans" DROP CONSTRAINT IF EXISTS "fk_rta_room_id";
        `);

        // Drop indexes for room_tahun_anggarans
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_rta_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_rta_room_tahun";`);

        // Drop room_tahun_anggarans table
        await queryRunner.query(`DROP TABLE IF EXISTS "room_tahun_anggarans";`);

        // Drop trigger
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_rooms_updated_at ON "rooms";`);

        // Drop indexes for rooms
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_rooms_kabkota_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_rooms_is_active";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_rooms_kabkota_id_unique";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_rooms_kode_room";`);

        // Drop rooms table
        await queryRunner.query(`DROP TABLE IF EXISTS "rooms";`);
    }
}
