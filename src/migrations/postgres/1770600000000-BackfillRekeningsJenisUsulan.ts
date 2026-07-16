import { MigrationInterface, QueryRunner } from 'typeorm';

export class BackfillRekeningsJenisUsulan1770600000000 implements MigrationInterface {
    name = 'BackfillRekeningsJenisUsulan1770600000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE "rekenings"
            SET "id_jenis_usulan" = 2
            WHERE "deleted_at" IS NULL
              AND (
                "rekening_kode" LIKE '5.2.04.01%'
                OR "rekening_uraian" ILIKE '%jalan%'
                OR "rekening_uraian" ILIKE '%jembatan%'
                OR "rekening_uraian" ILIKE '%landasan pacu%'
              )
        `);

        await queryRunner.query(`
            UPDATE "rekenings"
            SET "id_jenis_usulan" = 3
            WHERE "deleted_at" IS NULL
              AND "id_jenis_usulan" IS NULL
              AND (
                "rekening_kode" LIKE '5.2.04.02%'
                OR "rekening_uraian" ILIKE '%bangunan air%'
                OR "rekening_uraian" ILIKE '%irigasi%'
                OR "rekening_uraian" ILIKE '%saluran%'
                OR "rekening_uraian" ILIKE '%sungai%'
                OR "rekening_uraian" ILIKE '%pantai%'
                OR "rekening_uraian" ILIKE '%bendungan%'
                OR "rekening_uraian" ILIKE '%waduk%'
                OR "rekening_uraian" ILIKE '%rawa%'
                OR "rekening_uraian" ILIKE '%polder%'
                OR "rekening_uraian" ILIKE '%air bersih%'
                OR "rekening_uraian" ILIKE '%air baku%'
                OR "rekening_uraian" ILIKE '%air kotor%'
              )
        `);

        await queryRunner.query(`
            UPDATE "rekenings"
            SET "id_jenis_usulan" = 1
            WHERE "deleted_at" IS NULL
              AND "id_jenis_usulan" IS NULL
              AND (
                "rekening_kode" LIKE '5.2.03%'
                OR "rekening_kode" LIKE '5.1.02.03.03%'
                OR "rekening_uraian" ILIKE '%bangunan gedung%'
                OR "rekening_uraian" ILIKE '%rumah negara%'
                OR "rekening_uraian" ILIKE '%asrama%'
                OR "rekening_uraian" ILIKE '%hotel%'
                OR "rekening_uraian" ILIKE '%flat/rumah susun%'
              )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE "rekenings"
            SET "id_jenis_usulan" = NULL
            WHERE "deleted_at" IS NULL
              AND (
                "rekening_kode" LIKE '5.2.04.01%'
                OR "rekening_kode" LIKE '5.2.04.02%'
                OR "rekening_kode" LIKE '5.2.03%'
                OR "rekening_kode" LIKE '5.1.02.03.03%'
                OR "rekening_uraian" ILIKE '%jalan%'
                OR "rekening_uraian" ILIKE '%jembatan%'
                OR "rekening_uraian" ILIKE '%landasan pacu%'
                OR "rekening_uraian" ILIKE '%bangunan air%'
                OR "rekening_uraian" ILIKE '%irigasi%'
                OR "rekening_uraian" ILIKE '%saluran%'
                OR "rekening_uraian" ILIKE '%sungai%'
                OR "rekening_uraian" ILIKE '%pantai%'
                OR "rekening_uraian" ILIKE '%bendungan%'
                OR "rekening_uraian" ILIKE '%waduk%'
                OR "rekening_uraian" ILIKE '%rawa%'
                OR "rekening_uraian" ILIKE '%polder%'
                OR "rekening_uraian" ILIKE '%air bersih%'
                OR "rekening_uraian" ILIKE '%air baku%'
                OR "rekening_uraian" ILIKE '%air kotor%'
                OR "rekening_uraian" ILIKE '%bangunan gedung%'
                OR "rekening_uraian" ILIKE '%rumah negara%'
                OR "rekening_uraian" ILIKE '%asrama%'
                OR "rekening_uraian" ILIKE '%hotel%'
                OR "rekening_uraian" ILIKE '%flat/rumah susun%'
              )
        `);
    }
}
