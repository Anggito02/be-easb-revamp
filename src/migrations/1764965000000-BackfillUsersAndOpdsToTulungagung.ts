import { MigrationInterface, QueryRunner } from 'typeorm';

export class BackfillUsersAndOpdsToTulungagung1764965000000 implements MigrationInterface {
    name = 'BackfillUsersAndOpdsToTulungagung1764965000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$
            DECLARE
                v_room_id INTEGER;
            BEGIN
                -- Find Tulungagung room
                SELECT r.id INTO v_room_id
                FROM rooms r
                JOIN kabkotas k ON r.kabkota_id = k.id
                WHERE k.nama ILIKE '%Tulungagung%' AND r.deleted_at IS NULL
                LIMIT 1;

                IF v_room_id IS NULL THEN
                    RAISE NOTICE 'Tulungagung room not found, skipping backfill';
                    RETURN;
                END IF;

                -- Update all non-superadmin users without room_id
                UPDATE users
                SET room_id = v_room_id, updated_at = now()
                WHERE room_id IS NULL
                  AND deleted_at IS NULL
                  AND NOT ('superadmin' = ANY(roles));

                -- Update all OPDs without room_id
                UPDATE opds
                SET room_id = v_room_id, updated_at = now()
                WHERE room_id IS NULL AND deleted_at IS NULL;

                RAISE NOTICE 'Backfill to Tulungagung room % completed', v_room_id;
            END $$;
        `);
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {
        // No-op: cannot reliably un-backfill
    }
}
