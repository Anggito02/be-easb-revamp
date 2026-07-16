import { MigrationInterface, QueryRunner } from 'typeorm';
import {
    INDONESIA_KABKOTA_WILAYAH,
    INDONESIA_KABKOTA_WILAYAH_KODES,
} from './data/indonesia-kabkota-wilayah.generated';

/**
 * Full Indonesia kabupaten/kota (BPS-style kode) with official-style names
 * (Kabupaten … / Kota …), including Papua pemekaran and Papua Barat Daya split.
 * Upserts by kode so existing partial seeds get corrected names and province links.
 */
export class UpsertIndonesiaKabKotaWilayah1770800000000 implements MigrationInterface {
    name = 'UpsertIndonesiaKabKotaWilayah1770800000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const row of INDONESIA_KABKOTA_WILAYAH) {
            const provinces = await queryRunner.query(`SELECT id FROM "provinces" WHERE "kode" = $1`, [
                row.provinceKode,
            ]);
            if (!provinces.length) {
                throw new Error(`Province with kode ${row.provinceKode} not found for kabkota ${row.kode}`);
            }
            const provinceId = provinces[0].id as number;
            await queryRunner.query(
                `INSERT INTO "kabkotas" ("kode", "nama", "province_id", "is_active")
                 VALUES ($1, $2, $3, $4)
                 ON CONFLICT ("kode") DO UPDATE SET
                   "nama" = EXCLUDED."nama",
                   "province_id" = EXCLUDED."province_id",
                   "is_active" = EXCLUDED."is_active",
                   "deleted_at" = NULL,
                   "updated_at" = now()`,
                [row.kode, row.nama, provinceId, true],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const placeholders = INDONESIA_KABKOTA_WILAYAH_KODES.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "kabkotas" WHERE "kode" IN (${placeholders})`,
            INDONESIA_KABKOTA_WILAYAH_KODES,
        );
    }
}
