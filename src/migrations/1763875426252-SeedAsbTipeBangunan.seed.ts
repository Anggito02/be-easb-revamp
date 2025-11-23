import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAsbTipeBangunan1763875426252 implements MigrationInterface {
    name = 'SeedAsbTipeBangunan1763875426252';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const asbTipeBangunans = [
            { tipe_bangunan: 'Gedung Negara', id_asb_jenis: 1 },
            { tipe_bangunan: 'Rumah Negara', id_asb_jenis: 1 },
            { tipe_bangunan: 'Pagar Gedung Negara', id_asb_jenis: 1 },
            { tipe_bangunan: 'Pagar Rumah Negara', id_asb_jenis: 1 },
        ];

        for (const tipeBangunan of asbTipeBangunans) {
            await queryRunner.query(
                `INSERT INTO "asb_tipe_bangunan" ("tipe_bangunan", "id_asb_jenis")
                 VALUES ($1, $2)
                 ON CONFLICT ("tipe_bangunan") DO NOTHING`,
                [tipeBangunan.tipe_bangunan, tipeBangunan.id_asb_jenis],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tipeBangunanList = [
            'Gedung Negara',
            'Rumah Negara',
            'Pagar Gedung Negara',
            'Pagar Rumah Negara',
        ];

        const placeholders = tipeBangunanList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "asb_tipe_bangunan" WHERE "tipe_bangunan" IN (${placeholders})`,
            tipeBangunanList,
        );
    }
}
