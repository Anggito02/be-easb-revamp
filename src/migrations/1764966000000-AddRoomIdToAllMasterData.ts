import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoomIdToAllMasterData1764966000000 implements MigrationInterface {
    name = 'AddRoomIdToAllMasterData1764966000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // rekenings
        await queryRunner.query(`ALTER TABLE "rekenings" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_rekenings_room_id" ON "rekenings" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "rekenings" DROP CONSTRAINT IF EXISTS "fk_rekenings_room_id";`);
        await queryRunner.query(`ALTER TABLE "rekenings" ADD CONSTRAINT "fk_rekenings_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // satuans
        await queryRunner.query(`ALTER TABLE "satuans" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_satuans_room_id" ON "satuans" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "satuans" DROP CONSTRAINT IF EXISTS "fk_satuans_room_id";`);
        await queryRunner.query(`ALTER TABLE "satuans" ADD CONSTRAINT "fk_satuans_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // asb_fungsi_ruangs
        await queryRunner.query(`ALTER TABLE "asb_fungsi_ruangs" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_asb_fungsi_ruangs_room_id" ON "asb_fungsi_ruangs" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "asb_fungsi_ruangs" DROP CONSTRAINT IF EXISTS "fk_asb_fungsi_ruangs_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_fungsi_ruangs" ADD CONSTRAINT "fk_asb_fungsi_ruangs_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // asb_jenis
        await queryRunner.query(`ALTER TABLE "asb_jenis" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_asb_jenis_room_id" ON "asb_jenis" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "asb_jenis" DROP CONSTRAINT IF EXISTS "fk_asb_jenis_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_jenis" ADD CONSTRAINT "fk_asb_jenis_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // asb_lantais
        await queryRunner.query(`ALTER TABLE "asb_lantais" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_asb_lantais_room_id" ON "asb_lantais" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "asb_lantais" DROP CONSTRAINT IF EXISTS "fk_asb_lantais_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_lantais" ADD CONSTRAINT "fk_asb_lantais_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // asb_status
        await queryRunner.query(`ALTER TABLE "asb_status" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_asb_status_room_id" ON "asb_status" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "asb_status" DROP CONSTRAINT IF EXISTS "fk_asb_status_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_status" ADD CONSTRAINT "fk_asb_status_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // asb_tipe_bangunan
        await queryRunner.query(`ALTER TABLE "asb_tipe_bangunan" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_asb_tipe_bangunan_room_id" ON "asb_tipe_bangunan" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "asb_tipe_bangunan" DROP CONSTRAINT IF EXISTS "fk_asb_tipe_bangunan_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_tipe_bangunan" ADD CONSTRAINT "fk_asb_tipe_bangunan_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // asb_klasifikasi
        await queryRunner.query(`ALTER TABLE "asb_klasifikasi" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_asb_klasifikasi_room_id" ON "asb_klasifikasi" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "asb_klasifikasi" DROP CONSTRAINT IF EXISTS "fk_asb_klasifikasi_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_klasifikasi" ADD CONSTRAINT "fk_asb_klasifikasi_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // jenis_standars
        await queryRunner.query(`ALTER TABLE "jenis_standars" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_jenis_standars_room_id" ON "jenis_standars" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "jenis_standars" DROP CONSTRAINT IF EXISTS "fk_jenis_standars_room_id";`);
        await queryRunner.query(`ALTER TABLE "jenis_standars" ADD CONSTRAINT "fk_jenis_standars_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // shst
        await queryRunner.query(`ALTER TABLE "shst" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_shst_room_id" ON "shst" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "shst" DROP CONSTRAINT IF EXISTS "fk_shst_room_id";`);
        await queryRunner.query(`ALTER TABLE "shst" ADD CONSTRAINT "fk_shst_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // asb_komponen_bangunan_stds
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_stds" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_stds_room_id" ON "asb_komponen_bangunan_stds" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_stds" DROP CONSTRAINT IF EXISTS "fk_asb_komponen_bangunan_stds_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_stds" ADD CONSTRAINT "fk_asb_komponen_bangunan_stds_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // asb_komponen_bangunan_nonstd
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_nonstd" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_nonstd_room_id" ON "asb_komponen_bangunan_nonstd" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_nonstd" DROP CONSTRAINT IF EXISTS "fk_asb_komponen_bangunan_nonstd_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_nonstd" ADD CONSTRAINT "fk_asb_komponen_bangunan_nonstd_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // asb_komponen_bangunan_pros_std
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros_std" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_pros_std_room_id" ON "asb_komponen_bangunan_pros_std" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros_std" DROP CONSTRAINT IF EXISTS "fk_asb_komponen_bangunan_pros_std_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros_std" ADD CONSTRAINT "fk_asb_komponen_bangunan_pros_std_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // asb_komponen_bangunan_pros_nonstd
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros_nonstd" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_pros_nonstd_room_id" ON "asb_komponen_bangunan_pros_nonstd" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros_nonstd" DROP CONSTRAINT IF EXISTS "fk_asb_komponen_bangunan_pros_nonstd_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros_nonstd" ADD CONSTRAINT "fk_asb_komponen_bangunan_pros_nonstd_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // asb_jakon
        await queryRunner.query(`ALTER TABLE "asb_jakon" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_asb_jakon_room_id" ON "asb_jakon" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "asb_jakon" DROP CONSTRAINT IF EXISTS "fk_asb_jakon_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_jakon" ADD CONSTRAINT "fk_asb_jakon_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // asb_bps_gallery_std
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery_std" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_asb_bps_gallery_std_room_id" ON "asb_bps_gallery_std" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery_std" DROP CONSTRAINT IF EXISTS "fk_asb_bps_gallery_std_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery_std" ADD CONSTRAINT "fk_asb_bps_gallery_std_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // asb_bps_gallery_nonstd
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery_nonstd" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_asb_bps_gallery_nonstd_room_id" ON "asb_bps_gallery_nonstd" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery_nonstd" DROP CONSTRAINT IF EXISTS "fk_asb_bps_gallery_nonstd_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery_nonstd" ADD CONSTRAINT "fk_asb_bps_gallery_nonstd_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // verifikators
        await queryRunner.query(`ALTER TABLE "verifikators" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_verifikators_room_id" ON "verifikators" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "verifikators" DROP CONSTRAINT IF EXISTS "fk_verifikators_room_id";`);
        await queryRunner.query(`ALTER TABLE "verifikators" ADD CONSTRAINT "fk_verifikators_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);

        // standard_klasifikasi (special case: keep existing id_kabkota, add room_id alongside it)
        await queryRunner.query(`ALTER TABLE "standard_klasifikasi" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_standard_klasifikasi_room_id" ON "standard_klasifikasi" ("room_id");`);
        await queryRunner.query(`ALTER TABLE "standard_klasifikasi" DROP CONSTRAINT IF EXISTS "fk_standard_klasifikasi_room_id";`);
        await queryRunner.query(`ALTER TABLE "standard_klasifikasi" ADD CONSTRAINT "fk_standard_klasifikasi_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // standard_klasifikasi
        await queryRunner.query(`ALTER TABLE "standard_klasifikasi" DROP CONSTRAINT IF EXISTS "fk_standard_klasifikasi_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_standard_klasifikasi_room_id";`);
        await queryRunner.query(`ALTER TABLE "standard_klasifikasi" DROP COLUMN IF EXISTS "room_id";`);

        // verifikators
        await queryRunner.query(`ALTER TABLE "verifikators" DROP CONSTRAINT IF EXISTS "fk_verifikators_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_verifikators_room_id";`);
        await queryRunner.query(`ALTER TABLE "verifikators" DROP COLUMN IF EXISTS "room_id";`);

        // asb_bps_gallery_nonstd
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery_nonstd" DROP CONSTRAINT IF EXISTS "fk_asb_bps_gallery_nonstd_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bps_gallery_nonstd_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery_nonstd" DROP COLUMN IF EXISTS "room_id";`);

        // asb_bps_gallery_std
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery_std" DROP CONSTRAINT IF EXISTS "fk_asb_bps_gallery_std_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bps_gallery_std_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery_std" DROP COLUMN IF EXISTS "room_id";`);

        // asb_jakon
        await queryRunner.query(`ALTER TABLE "asb_jakon" DROP CONSTRAINT IF EXISTS "fk_asb_jakon_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_jakon_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_jakon" DROP COLUMN IF EXISTS "room_id";`);

        // asb_komponen_bangunan_pros_nonstd
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros_nonstd" DROP CONSTRAINT IF EXISTS "fk_asb_komponen_bangunan_pros_nonstd_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_pros_nonstd_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros_nonstd" DROP COLUMN IF EXISTS "room_id";`);

        // asb_komponen_bangunan_pros_std
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros_std" DROP CONSTRAINT IF EXISTS "fk_asb_komponen_bangunan_pros_std_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_pros_std_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros_std" DROP COLUMN IF EXISTS "room_id";`);

        // asb_komponen_bangunan_nonstd
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_nonstd" DROP CONSTRAINT IF EXISTS "fk_asb_komponen_bangunan_nonstd_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_nonstd_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_nonstd" DROP COLUMN IF EXISTS "room_id";`);

        // asb_komponen_bangunan_stds
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_stds" DROP CONSTRAINT IF EXISTS "fk_asb_komponen_bangunan_stds_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_stds_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_stds" DROP COLUMN IF EXISTS "room_id";`);

        // shst
        await queryRunner.query(`ALTER TABLE "shst" DROP CONSTRAINT IF EXISTS "fk_shst_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_shst_room_id";`);
        await queryRunner.query(`ALTER TABLE "shst" DROP COLUMN IF EXISTS "room_id";`);

        // jenis_standars
        await queryRunner.query(`ALTER TABLE "jenis_standars" DROP CONSTRAINT IF EXISTS "fk_jenis_standars_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jenis_standars_room_id";`);
        await queryRunner.query(`ALTER TABLE "jenis_standars" DROP COLUMN IF EXISTS "room_id";`);

        // asb_klasifikasi
        await queryRunner.query(`ALTER TABLE "asb_klasifikasi" DROP CONSTRAINT IF EXISTS "fk_asb_klasifikasi_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_klasifikasi_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_klasifikasi" DROP COLUMN IF EXISTS "room_id";`);

        // asb_tipe_bangunan
        await queryRunner.query(`ALTER TABLE "asb_tipe_bangunan" DROP CONSTRAINT IF EXISTS "fk_asb_tipe_bangunan_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_tipe_bangunan_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_tipe_bangunan" DROP COLUMN IF EXISTS "room_id";`);

        // asb_status
        await queryRunner.query(`ALTER TABLE "asb_status" DROP CONSTRAINT IF EXISTS "fk_asb_status_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_status_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_status" DROP COLUMN IF EXISTS "room_id";`);

        // asb_lantais
        await queryRunner.query(`ALTER TABLE "asb_lantais" DROP CONSTRAINT IF EXISTS "fk_asb_lantais_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_lantais_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_lantais" DROP COLUMN IF EXISTS "room_id";`);

        // asb_jenis
        await queryRunner.query(`ALTER TABLE "asb_jenis" DROP CONSTRAINT IF EXISTS "fk_asb_jenis_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_jenis_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_jenis" DROP COLUMN IF EXISTS "room_id";`);

        // asb_fungsi_ruangs
        await queryRunner.query(`ALTER TABLE "asb_fungsi_ruangs" DROP CONSTRAINT IF EXISTS "fk_asb_fungsi_ruangs_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_fungsi_ruangs_room_id";`);
        await queryRunner.query(`ALTER TABLE "asb_fungsi_ruangs" DROP COLUMN IF EXISTS "room_id";`);

        // satuans
        await queryRunner.query(`ALTER TABLE "satuans" DROP CONSTRAINT IF EXISTS "fk_satuans_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_satuans_room_id";`);
        await queryRunner.query(`ALTER TABLE "satuans" DROP COLUMN IF EXISTS "room_id";`);

        // rekenings
        await queryRunner.query(`ALTER TABLE "rekenings" DROP CONSTRAINT IF EXISTS "fk_rekenings_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_rekenings_room_id";`);
        await queryRunner.query(`ALTER TABLE "rekenings" DROP COLUMN IF EXISTS "room_id";`);
    }
}
