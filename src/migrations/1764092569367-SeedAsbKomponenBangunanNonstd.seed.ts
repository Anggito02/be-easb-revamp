import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAsbKomponenBangunanNonstd1764092569367 implements MigrationInterface {
    name = 'SeedAsbKomponenBangunanNonstd1764092569367';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO asb_komponen_bangunan_nonstd (komponen, bobot_min, bobot, bobot_max) VALUES
            ('Alat Pengkondisi Udara', 7, 11, 15),
            ('Elevator/Escalator', 8, 11, 14),
            ('Tata Suara (Sound System)', 2, 3, 4),
            ('Telepon/PABX', 1, 2, 3),
            ('Instalasi IT (Informasi dan Teknologi)', 6, 8.5, 11),
            ('Elektrikal', 7, 9.5, 12),
            ('Sistem Proteksi Kebakaran', 7, 9.5, 12),
            ('Penangkal Petir Khusus', 1, 1.5, 2),
            ('IPAL', 1, 1.5, 2),
            ('Interior (dan Furniture)', 15, 20, 25),
            ('Gas Pembakaran', 1, 1.5, 2),
            ('Gas Medis', 2, 3, 4),
            ('Pencegahan Bahaya Rayap', 1, 2, 3),
            ('Pondasi Dalam', 7, 9.5, 12),
            ('Fasilitas Penyandang Disabilitas', 3, 4, 5),
            ('Sarana dan Prasarana Lingkungan', 3, 5.5, 8),
            ('Peningkatan Mutu', 1, 30, 30),
            ('Perizinan selain IMB', 1, 1, 1),
            ('Penyiapan Pematangan Lahan', 1, 1.75, 3.5),
            ('Pemenuhan Persyaratan Bangunan Gedung Hijau', 1, 4.75, 9.5),
            ('Penyambungan Utilitas', 1, 1.5, 2);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM asb_komponen_bangunan_nonstd 
            WHERE komponen IN (
                'Alat Pengkondisi Udara', 'Elevator/Escalator', 'Tata Suara (Sound System)',
                'Telepon/PABX', 'Instalasi IT (Informasi dan Teknologi)', 'Elektrikal',
                'Sistem Proteksi Kebakaran', 'Penangkal Petir Khusus', 'IPAL',
                'Interior (dan Furniture)', 'Gas Pembakaran', 'Gas Medis',
                'Pencegahan Bahaya Rayap', 'Pondasi Dalam', 'Fasilitas Penyandang Disabilitas',
                'Sarana dan Prasarana Lingkungan', 'Peningkatan Mutu', 'Perizinan selain IMB',
                'Penyiapan Pematangan Lahan', 'Pemenuhan Persyaratan Bangunan Gedung Hijau',
                'Penyambungan Utilitas'
            );
        `);
    }
}
