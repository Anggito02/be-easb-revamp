import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAsbKomponenBangunanStd1764090529147 implements MigrationInterface {
    name = 'SeedAsbKomponenBangunanStd1764090529147';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Seed data for asb_jenis id = 1
        await queryRunner.query(`
            INSERT INTO asb_komponen_bangunan_stds (komponen, files, id_asb_jenis) VALUES
            ('Pondasi', 'ORIGIN', 1),
            ('Struktur', 'ORIGIN', 1),
            ('Lantai', 'ORIGIN', 1),
            ('Dinding', 'ORIGIN', 1),
            ('Plafon', 'ORIGIN', 1),
            ('Atap', 'ORIGIN', 1),
            ('Utilitas', 'ORIGIN', 1),
            ('Finishing', 'ORIGIN', 1);
        `);

        // Seed data for asb_jenis id = 2
        await queryRunner.query(`
            INSERT INTO asb_komponen_bangunan_stds (komponen, files, id_asb_jenis) VALUES
            ('Pondasi', 'ORIGIN', 2),
            ('Struktur (Kolom, Balok & Ring Balk)', 'ORIGIN', 2),
            ('Struktur (Plesteran)', 'ORIGIN', 2),
            ('Atap (Rangka)', 'ORIGIN', 2),
            ('Atap (Penutup)', 'ORIGIN', 2),
            ('Langit - Langit (Rangka)', 'ORIGIN', 2),
            ('Langit - Langit (Penutup)', 'ORIGIN', 2),
            ('Dinding (Batu Bata / Partisi)', 'ORIGIN', 2),
            ('Dinding (Plesteran)', 'ORIGIN', 2),
            ('Dinding (Kaca)', 'ORIGIN', 2),
            ('Dinding (Pintu)', 'ORIGIN', 2),
            ('Dinding (Kosen)', 'ORIGIN', 2),
            ('Lantai (Penutup Lantai)', 'ORIGIN', 2),
            ('Utilitas (Instalasi Listrik)', 'ORIGIN', 2),
            ('Utilitas (Instalasi Air)', 'ORIGIN', 2),
            ('Utilitas (Drainase Limbah)', 'ORIGIN', 2),
            ('Finishing (Cat Struktur)', 'ORIGIN', 2),
            ('Finishing (Cat Langit Langit)', 'ORIGIN', 2),
            ('Finishing (Cat Dinding)', 'ORIGIN', 2),
            ('Finishing (Cat Pintu/Kosen)', 'ORIGIN', 2);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Delete seeded data
        await queryRunner.query(`
            DELETE FROM asb_komponen_bangunan_stds 
            WHERE komponen IN (
                'Pondasi', 'Struktur', 'Lantai', 'Dinding', 'Plafon', 'Atap', 'Utilitas', 'Finishing',
                'Struktur (Kolom, Balok & Ring Balk)', 'Struktur (Plesteran)',
                'Atap (Rangka)', 'Atap (Penutup)',
                'Langit - Langit (Rangka)', 'Langit - Langit (Penutup)',
                'Dinding (Batu Bata / Partisi)', 'Dinding (Plesteran)', 'Dinding (Kaca)', 
                'Dinding (Pintu)', 'Dinding (Kosen)',
                'Lantai (Penutup Lantai)',
                'Utilitas (Instalasi Listrik)', 'Utilitas (Instalasi Air)', 'Utilitas (Drainase Limbah)',
                'Finishing (Cat Struktur)', 'Finishing (Cat Langit Langit)', 'Finishing (Cat Dinding)', 'Finishing (Cat Pintu/Kosen)'
            );
        `);
    }
}
