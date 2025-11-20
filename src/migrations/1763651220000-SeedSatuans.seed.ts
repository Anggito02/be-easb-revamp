import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedSatuans1763651220000 implements MigrationInterface {
    name = 'SeedSatuans1763651220000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const satuans = [
            { satuan: 'Liter' },
            { satuan: 'Luas / M2' },
            { satuan: 'Lusin' },
            { satuan: 'M' },
            { satuan: 'M / Lari' },
            { satuan: 'M1' },
            { satuan: 'M2' },
            { satuan: 'M2 Kedalaman S.D 1 M' },
            { satuan: 'M2 Per Bulan' },
            { satuan: 'M2 Per Hari' },
            { satuan: 'M2/Tahun' },
            { satuan: 'M3' },
            { satuan: 'M3"' },
            { satuan: 'Macam' },
            { satuan: 'Materi' },
            { satuan: 'Media' },
            { satuan: 'Menit' },
            { satuan: 'Meter' },
            { satuan: 'Minggu' },
            { satuan: 'Ml' },
            { satuan: 'MMKolom' },
            { satuan: 'Ons' },
            { satuan: 'Orang' },
            { satuan: 'Orang / Acara' },
            { satuan: 'Orang / Alamat' },
        ];

        for (const satuan of satuans) {
            await queryRunner.query(
                `INSERT INTO "satuans" ("satuan", "is_active")
                 VALUES ($1, $2)
                 ON CONFLICT ("satuan") DO NOTHING`,
                [satuan.satuan, true],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const satuanList = [
            'Liter',
            'Luas / M2',
            'Lusin',
            'M',
            'M / Lari',
            'M1',
            'M2',
            'M2 Kedalaman S.D 1 M',
            'M2 Per Bulan',
            'M2 Per Hari',
            'M2/Tahun',
            'M3',
            'M3"',
            'Macam',
            'Materi',
            'Media',
            'Menit',
            'Meter',
            'Minggu',
            'Ml',
            'MMKolom',
            'Ons',
            'Orang',
            'Orang / Acara',
            'Orang / Alamat',
        ];

        const placeholders = satuanList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "satuans" WHERE "satuan" IN (${placeholders})`,
            satuanList,
        );
    }
}
