import { MigrationInterface, QueryRunner } from 'typeorm';

export class ActivateTulungagungRoom1764962000000 implements MigrationInterface {
    name = 'ActivateTulungagungRoom1764962000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Find and activate the Tulungagung room
        await queryRunner.query(`
            DO $$
            DECLARE
                v_kabkota_id INTEGER;
                v_room_id INTEGER;
            BEGIN
                -- Find Tulungagung kabkota
                SELECT id INTO v_kabkota_id
                FROM "kabkotas"
                WHERE "nama" ILIKE '%Tulungagung%'
                  AND "deleted_at" IS NULL
                LIMIT 1;

                IF v_kabkota_id IS NULL THEN
                    RAISE NOTICE 'Tulungagung kabkota not found, skipping activation';
                    RETURN;
                END IF;

                -- Find linked room
                SELECT id INTO v_room_id
                FROM "rooms"
                WHERE "kabkota_id" = v_kabkota_id AND "deleted_at" IS NULL
                LIMIT 1;

                IF v_room_id IS NULL THEN
                    RAISE NOTICE 'Tulungagung room not found, skipping activation';
                    RETURN;
                END IF;

                -- Activate room with 1-year contract
                UPDATE "rooms"
                SET
                    "is_active" = true,
                    "contract_start" = CURRENT_DATE,
                    "contract_end" = CURRENT_DATE + INTERVAL '1 year',
                    "updated_at" = now()
                WHERE "id" = v_room_id;

                -- Add tahun anggaran 2025 if not exists
                INSERT INTO "room_tahun_anggarans" ("room_id", "tahun", "is_active", "created_at")
                VALUES (v_room_id, 2025, true, now())
                ON CONFLICT (room_id, tahun) DO NOTHING;

                -- Add tahun anggaran 2026 if not exists
                INSERT INTO "room_tahun_anggarans" ("room_id", "tahun", "is_active", "created_at")
                VALUES (v_room_id, 2026, true, now())
                ON CONFLICT (room_id, tahun) DO NOTHING;

                RAISE NOTICE 'Tulungagung room % activated successfully', v_room_id;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Deactivate Tulungagung room and remove its tahun anggarans
        await queryRunner.query(`
            DO $$
            DECLARE
                v_room_id INTEGER;
            BEGIN
                SELECT r."id" INTO v_room_id
                FROM "rooms" r
                JOIN "kabkotas" k ON r."kabkota_id" = k."id"
                WHERE k."nama" ILIKE '%Tulungagung%' AND r."deleted_at" IS NULL
                LIMIT 1;

                IF v_room_id IS NOT NULL THEN
                    UPDATE "rooms"
                    SET "is_active" = false, "contract_start" = NULL, "contract_end" = NULL
                    WHERE "id" = v_room_id;

                    DELETE FROM "room_tahun_anggarans"
                    WHERE "room_id" = v_room_id AND "tahun" IN (2025, 2026);
                END IF;
            END $$;
        `);
    }
}
