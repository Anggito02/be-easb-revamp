import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnforceRoomIdNotNull1764968000000 implements MigrationInterface {
    name = 'EnforceRoomIdNotNull1764968000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Fallback: if any rows still have room_id IS NULL, assign the first available active room
        const fallbackSql = `(SELECT id FROM rooms WHERE deleted_at IS NULL LIMIT 1)`;

        // rekenings: enforce NOT NULL + update unique constraint to (room_id, rekening_kode)
        await queryRunner.query(`UPDATE "rekenings" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "rekenings" ALTER COLUMN "room_id" SET NOT NULL;`);
        // Drop old unique constraint on rekening_kode alone, add composite
        await queryRunner.query(`
            DO $$ BEGIN
                IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'rekenings_rekening_kode_key' AND conrelid = 'rekenings'::regclass) THEN
                    ALTER TABLE "rekenings" DROP CONSTRAINT "rekenings_rekening_kode_key";
                END IF;
            END $$;
        `);
        await queryRunner.query(`ALTER TABLE "rekenings" DROP CONSTRAINT IF EXISTS "UQ_rekenings_room_rekening_kode";`);
        await queryRunner.query(`ALTER TABLE "rekenings" ADD CONSTRAINT "UQ_rekenings_room_rekening_kode" UNIQUE ("room_id", "rekening_kode");`);

        // satuans
        await queryRunner.query(`UPDATE "satuans" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "satuans" ALTER COLUMN "room_id" SET NOT NULL;`);

        // asb_fungsi_ruangs
        await queryRunner.query(`UPDATE "asb_fungsi_ruangs" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "asb_fungsi_ruangs" ALTER COLUMN "room_id" SET NOT NULL;`);

        // asb_jenis
        await queryRunner.query(`UPDATE "asb_jenis" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "asb_jenis" ALTER COLUMN "room_id" SET NOT NULL;`);

        // asb_lantais
        await queryRunner.query(`UPDATE "asb_lantais" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "asb_lantais" ALTER COLUMN "room_id" SET NOT NULL;`);

        // asb_status
        await queryRunner.query(`UPDATE "asb_status" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "asb_status" ALTER COLUMN "room_id" SET NOT NULL;`);

        // asb_tipe_bangunan
        await queryRunner.query(`UPDATE "asb_tipe_bangunan" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "asb_tipe_bangunan" ALTER COLUMN "room_id" SET NOT NULL;`);

        // asb_klasifikasi: update existing unique constraint to include room_id
        await queryRunner.query(`UPDATE "asb_klasifikasi" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "asb_klasifikasi" ALTER COLUMN "room_id" SET NOT NULL;`);
        await queryRunner.query(`ALTER TABLE "asb_klasifikasi" DROP CONSTRAINT IF EXISTS "UQ_asb_klasifikasi_klasifikasi_tipe";`);
        await queryRunner.query(`ALTER TABLE "asb_klasifikasi" ADD CONSTRAINT "UQ_asb_klasifikasi_room_klasifikasi_tipe" UNIQUE ("room_id", "klasifikasi", "id_asb_tipe_bangunan");`);

        // jenis_standars
        await queryRunner.query(`UPDATE "jenis_standars" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "jenis_standars" ALTER COLUMN "room_id" SET NOT NULL;`);

        // shst: update existing unique constraint to include room_id
        await queryRunner.query(`UPDATE "shst" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "shst" ALTER COLUMN "room_id" SET NOT NULL;`);
        await queryRunner.query(`ALTER TABLE "shst" DROP CONSTRAINT IF EXISTS "UQ_shst_unique";`);
        await queryRunner.query(`ALTER TABLE "shst" ADD CONSTRAINT "UQ_shst_unique" UNIQUE ("room_id", "tahun", "id_asb_tipe_bangunan", "id_asb_klasifikasi", "id_kabkota");`);

        // asb_komponen_bangunan_stds
        await queryRunner.query(`UPDATE "asb_komponen_bangunan_stds" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_stds" ALTER COLUMN "room_id" SET NOT NULL;`);

        // asb_komponen_bangunan_nonstd
        await queryRunner.query(`UPDATE "asb_komponen_bangunan_nonstd" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_nonstd" ALTER COLUMN "room_id" SET NOT NULL;`);

        // asb_komponen_bangunan_pros_std
        await queryRunner.query(`UPDATE "asb_komponen_bangunan_pros_std" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros_std" ALTER COLUMN "room_id" SET NOT NULL;`);

        // asb_komponen_bangunan_pros_nonstd
        await queryRunner.query(`UPDATE "asb_komponen_bangunan_pros_nonstd" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros_nonstd" ALTER COLUMN "room_id" SET NOT NULL;`);

        // asb_jakon
        await queryRunner.query(`UPDATE "asb_jakon" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "asb_jakon" ALTER COLUMN "room_id" SET NOT NULL;`);

        // asb_bps_gallery_std
        await queryRunner.query(`UPDATE "asb_bps_gallery_std" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery_std" ALTER COLUMN "room_id" SET NOT NULL;`);

        // asb_bps_gallery_nonstd
        await queryRunner.query(`UPDATE "asb_bps_gallery_nonstd" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery_nonstd" ALTER COLUMN "room_id" SET NOT NULL;`);

        // verifikators
        await queryRunner.query(`UPDATE "verifikators" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "verifikators" ALTER COLUMN "room_id" SET NOT NULL;`);

        // standard_klasifikasi
        await queryRunner.query(`UPDATE "standard_klasifikasi" SET room_id = ${fallbackSql} WHERE room_id IS NULL;`);
        await queryRunner.query(`ALTER TABLE "standard_klasifikasi" ALTER COLUMN "room_id" SET NOT NULL;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // standard_klasifikasi
        await queryRunner.query(`ALTER TABLE "standard_klasifikasi" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // verifikators
        await queryRunner.query(`ALTER TABLE "verifikators" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // asb_bps_gallery_nonstd
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery_nonstd" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // asb_bps_gallery_std
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery_std" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // asb_jakon
        await queryRunner.query(`ALTER TABLE "asb_jakon" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // asb_komponen_bangunan_pros_nonstd
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros_nonstd" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // asb_komponen_bangunan_pros_std
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros_std" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // asb_komponen_bangunan_nonstd
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_nonstd" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // asb_komponen_bangunan_stds
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_stds" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // shst: restore old unique constraint without room_id
        await queryRunner.query(`ALTER TABLE "shst" DROP CONSTRAINT IF EXISTS "UQ_shst_unique";`);
        await queryRunner.query(`ALTER TABLE "shst" ADD CONSTRAINT "UQ_shst_unique" UNIQUE ("tahun", "id_asb_tipe_bangunan", "id_asb_klasifikasi", "id_kabkota");`);
        await queryRunner.query(`ALTER TABLE "shst" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // jenis_standars
        await queryRunner.query(`ALTER TABLE "jenis_standars" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // asb_klasifikasi: restore old unique constraint without room_id
        await queryRunner.query(`ALTER TABLE "asb_klasifikasi" DROP CONSTRAINT IF EXISTS "UQ_asb_klasifikasi_room_klasifikasi_tipe";`);
        await queryRunner.query(`ALTER TABLE "asb_klasifikasi" ADD CONSTRAINT "UQ_asb_klasifikasi_klasifikasi_tipe" UNIQUE ("klasifikasi", "id_asb_tipe_bangunan");`);
        await queryRunner.query(`ALTER TABLE "asb_klasifikasi" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // asb_tipe_bangunan
        await queryRunner.query(`ALTER TABLE "asb_tipe_bangunan" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // asb_status
        await queryRunner.query(`ALTER TABLE "asb_status" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // asb_lantais
        await queryRunner.query(`ALTER TABLE "asb_lantais" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // asb_jenis
        await queryRunner.query(`ALTER TABLE "asb_jenis" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // asb_fungsi_ruangs
        await queryRunner.query(`ALTER TABLE "asb_fungsi_ruangs" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // satuans
        await queryRunner.query(`ALTER TABLE "satuans" ALTER COLUMN "room_id" DROP NOT NULL;`);

        // rekenings: restore old single-column unique constraint
        await queryRunner.query(`ALTER TABLE "rekenings" DROP CONSTRAINT IF EXISTS "UQ_rekenings_room_rekening_kode";`);
        await queryRunner.query(`ALTER TABLE "rekenings" ADD CONSTRAINT "rekenings_rekening_kode_key" UNIQUE ("rekening_kode");`);
        await queryRunner.query(`ALTER TABLE "rekenings" ALTER COLUMN "room_id" DROP NOT NULL;`);
    }
}
