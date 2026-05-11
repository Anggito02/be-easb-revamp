import { MigrationInterface, QueryRunner } from 'typeorm';

export class BackfillRoomIdToTulungagung1764967000000 implements MigrationInterface {
    name = 'BackfillRoomIdToTulungagung1764967000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$
            DECLARE
                v_room_id INTEGER;
            BEGIN
                SELECT r.id INTO v_room_id
                FROM rooms r
                JOIN kabkotas k ON r.kabkota_id = k.id
                WHERE k.nama ILIKE '%Tulungagung%' AND r.deleted_at IS NULL
                LIMIT 1;

                IF v_room_id IS NULL THEN
                    RAISE NOTICE 'Tulungagung room not found, skipping backfill';
                    RETURN;
                END IF;

                UPDATE "rekenings" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "satuans" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "asb_fungsi_ruangs" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "asb_jenis" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "asb_lantais" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "asb_status" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "asb_tipe_bangunan" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "asb_klasifikasi" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "jenis_standars" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "shst" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "asb_komponen_bangunan_stds" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "asb_komponen_bangunan_nonstd" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "asb_komponen_bangunan_pros_std" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "asb_komponen_bangunan_pros_nonstd" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "asb_jakon" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "asb_bps_gallery_std" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "asb_bps_gallery_nonstd" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "verifikators" SET room_id = v_room_id WHERE room_id IS NULL;
                UPDATE "standard_klasifikasi" SET room_id = v_room_id WHERE room_id IS NULL;

                RAISE NOTICE 'Backfill to Tulungagung room % completed', v_room_id;
            END $$;
        `);
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {
        // No-op: cannot reliably reverse a backfill
    }
}
